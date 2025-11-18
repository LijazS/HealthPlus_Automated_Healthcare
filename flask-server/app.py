import datetime
import email
from flask import Flask, redirect, request, jsonify, session
from flask_cors import CORS
from google_auth_oauthlib.flow import Flow
import os
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import Bcrypt

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

app = Flask(__name__)
app.secret_key = os.getenv("SECRET_KEY")
CORS(app, supports_credentials=True)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

#Db connection
client = MongoClient(MONGO_URI, server_api=ServerApi('1'))
db = client.my_db
user_collection = db['users']
appointment_collection = db['appointments']



@app.route('/')
def home():
    return jsonify({"message": "Hello from Flask!"})


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
    

@app.route('/appointments', methods=['POST'])
@jwt_required()
def book_appointment():
    user_email = get_jwt_identity()
    appointment_data = request.json
    appointment_data['user_email'] = user_email
    appointment_collection.insert_one(appointment_data)
    return jsonify({"message": "Appointment booked successfully!"}), 201

@app.route('/verify', methods=['GET'])
@jwt_required()
def verify():
    user = get_jwt_identity()
    return jsonify({"valid": True, "user": user}), 200



if __name__ == '__main__':
    app.run(debug=True)
