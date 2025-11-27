#!/bin/bash
# 1. Update and Install Basics
sudo apt-get update -y
sudo apt-get install -y python3-pip git curl

# 2. Install Node.js 20.x (REQUIRED for Vite 7)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 3. Clone Repo
git clone https://github.com/LijazS/HealthPlus_Automated_Healthcare.git /home/ubuntu/app

# 4. Setup Flask Backend
cd /home/ubuntu/app/flask-server
pip3 install -r requirements.txt
nohup python3 app.py > backend.log 2>&1 &

# 5. Setup Express/Vite Frontend
cd /home/ubuntu/app/frontend
npm install
# Force Host to 0.0.0.0 so it is accessible from internet
nohup npm run dev -- --host 0.0.0.0 > frontend.log 2>&1 &
