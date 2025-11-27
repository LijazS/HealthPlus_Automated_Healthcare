#!/bin/bash
sudo apt-get update -y
sudo apt-get install -y python3-pip git

# Clone Repo
git clone https://github.com/LijazS/HealthPlus_Automated_Healthcare.git /home/ubuntu/app

# Setup Flask Backend
cd /home/ubuntu/app/flask-server
pip3 install -r requirements.txt
nohup python3 app.py > backend.log 2>&1 &
