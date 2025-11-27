import datetime
import email
from flask import Flask, redirect, request, jsonify, session
from flask_cors import CORS
import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt

load_dotenv()

# Load sensitive values from environment only (no hard-coded secrets)
MONGO_URI = os.getenv("MONGO_URI")
SECRET_KEY = os.getenv("SECRET_KEY")

if not MONGO_URI:
    raise RuntimeError(
        "MONGO_URI environment variable not set. Create a local .env file (see flask-server/.env.example) and do not commit credentials."
    )
if not SECRET_KEY:
    raise RuntimeError(
        "SECRET_KEY environment variable not set. Create a local .env file (see flask-server/.env.example) and do not commit credentials."
    )

app = Flask(__name__)
app.secret_key = SECRET_KEY
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

#Db connection
client = MongoClient(MONGO_URI)
db = client.my_db
user_collection = db['users']
appointment_collection = db['appointments']


ADMIN_USER = os.environ.get("ADMIN_USER", "admin")
ADMIN_PASS = os.environ.get("ADMIN_PASS")  # plain or hashed; better hashed



@app.route('/')
def home():
    return jsonify({"message": "Hello from Flask!"})


###################################### USER REGISTERATION AND LOGIN ############################################
@app.route('/Register', methods=['POST'])
def register():
    user_data = request.json
    name = user_data['name']
    email = user_data['email']
    password = user_data['password']

    found = user_collection.find_one({"email":email})
    if found:
        return jsonify({"message": "User already exists!"}), 400
    else:
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        user_collection.insert_one({"name": name, "email": email, "password": hashed_password})
        token = create_access_token(identity=email, expires_delta=datetime.timedelta(hours=2))
        return jsonify({"message": "User registered successfully!","token":token}), 201
    

@app.route('/Login', methods=['POST'])
def Login():
    user_data = request.json
    found = user_collection.find_one({"email":user_data['email']})
    if found:
        if bcrypt.check_password_hash(found['password'], user_data['password']):
             # Create JWT token
            token = create_access_token(identity=user_data['email'], expires_delta=datetime.timedelta(hours=2))
            return jsonify({"message": "Login successful!", "name": found['name'], "token": token}), 200
        else:
            return jsonify({"message": "Invalid email or password"}), 400   
    else:
        return jsonify({"message": "Invalid email or password"}), 400
    
###################################### USER REGISTERATION AND LOGIN ############################################

###################################### APPOINTMENTS ############################################

@app.route('/appointments', methods=['POST'])
@jwt_required()
def book_appointment():
    user_email = get_jwt_identity()
    tot_pending = appointment_collection.count_documents({"user_email": user_email, "status": "Pending"})
    
    if tot_pending >= 3:
        return jsonify({"message": "You have reached the maximum number of pending appointments (3). Please wait for existing appointments to be processed."}), 400
    appointment_data = request.get_json(silent=True)
    if not appointment_data:
        return jsonify({"message": "Invalid or missing JSON body."}), 400

    # Ensure required fields are present and non-empty (not just present)
    required = ['preferredDate', 'phone', 'speciality']
    missing = [k for k in required if k not in appointment_data or not str(appointment_data.get(k, '')).strip()]
    if missing:
        return jsonify({"message": "Missing required appointment fields.", "missing": missing}), 400
    appointment_data['user_email'] = user_email
    appointment_data['status'] = "Pending"
    appointment_collection.insert_one(appointment_data)
    return jsonify({"message": "Appointment booked successfully!"}), 201

@app.route('/appointments', methods=['GET'])
@jwt_required()
def get_appointments():
    user_email = get_jwt_identity()
    appointments = list(appointment_collection.find({"user_email": user_email}, {'_id': 0}))
    return jsonify(appointments), 200



###################################### APPOINTMENTS ############################################
###################################### ADMIN ############################################

@app.route('/admin/login', methods=['POST'])
def admin_login():
    admin_data = request.json
    username = admin_data.get('username')
    password = admin_data.get('password')

    if username == ADMIN_USER and password == ADMIN_PASS:
        token = create_access_token(identity=username, expires_delta=datetime.timedelta(hours=2))
        return jsonify({"message": "Admin login successful!", "token": token}), 200
    else:
        return jsonify({"message": "Invalid admin credentials"}), 401


###################################### ADMIN ############################################


@app.route('/verify', methods=['GET'])
@jwt_required()
def verify():
    user = get_jwt_identity()
    return jsonify({"valid": True, "user": user}), 200



if __name__ == '__main__':
    app.run(port=5000, host='0.0.0.0', debug=True)
