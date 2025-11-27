terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

  backend "s3" {
    bucket         = "healthplus-tf-state-lijaz" 
    key            = "healthplus/part1/terraform.tfstate" 
    region         = "ap-south-1" 
    encrypt        = true
  }
}

provider "aws" {
  region = "ap-south-1"
}

resource "aws_security_group" "app_sg" {
  name        = "healthplus-sg"
  description = "Allow SSH, HTTP, Flask, and Express"

  # SSH
  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTP (Standard Web)
  ingress {
    description = "HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # ADDED: Flask Backend
  ingress {
    description = "Flask"
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # ADDED: Express Frontend
  ingress {
    description = "React_vite"
    from_port   = 5173
    to_port     = 5173
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow server to talk to the outside world (download updates etc.)
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

resource "aws_instance" "app_server" {
  ami           = "ami-0f5ee92e2d63afc18"  # Ubuntu 22.04 LTS (Mumbai)
  instance_type = "t3.micro"              # CHANGED from t2.micro to t3.micro
  
  vpc_security_group_ids = [aws_security_group.app_sg.id]
  user_data = file("user_data.sh")

  tags = {
    Name = "HealthPlus-App-Server"
  }
}

output "public_ip" {
  value = aws_instance.app_server.public_ip
}

