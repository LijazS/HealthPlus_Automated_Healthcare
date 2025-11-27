#!/bin/bash
# Install Node.js 20.x
sudo apt-get update -y
sudo apt-get install -y git curl
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone Repo
git clone https://github.com/LijazS/HealthPlus_Automated_Healthcare.git /home/ubuntu/app

# Setup Frontend
cd /home/ubuntu/app/frontend
npm install

# Create .env file with Backend IP
echo "VITE_API_URL=http://${backend_ip}:5000" > .env

# Start App
nohup npm run dev -- --host 0.0.0.0 > frontend.log 2>&1 &
