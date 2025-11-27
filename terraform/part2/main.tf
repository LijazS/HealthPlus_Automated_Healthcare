# terraform/part2-separate-instances/main.tf

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }

  backend "s3" {
    bucket         = "healthplus-tf-state-lijaz" # SAME bucket as Part 1
    key            = "healthplus/part2/terraform.tfstate" # DIFFERENT key (folder)
    region         = "ap-south-1"
    encrypt        = true
  }
}

provider "aws" {
  region = "ap-south-1"
}

# --- Security Groups ---

# Frontend SG: Allows Public Access to Vite (5173)
resource "aws_security_group" "frontend_sg" {
  name        = "healthplus-frontend-sg"
  description = "Allow SSH and Vite Frontend"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Vite Frontend"
    from_port   = 5173
    to_port     = 5173
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Backend SG: Allows Traffic from Frontend
resource "aws_security_group" "backend_sg" {
  name        = "healthplus-backend-sg"
  description = "Allow SSH and Flask Backend"

  ingress {
    description = "SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    description = "Flask Backend (Public)"
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  # Allow traffic SPECIFICALLY from the Frontend Instance
  ingress {
    description     = "Flask from Frontend SG"
    from_port       = 5000
    to_port         = 5000
    protocol        = "tcp"
    security_groups = [aws_security_group.frontend_sg.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# --- Instances ---

resource "aws_instance" "backend_server" {
  ami           = "ami-0f5ee92e2d63afc18" # Ubuntu 22.04 (Mumbai)
  instance_type = "t3.micro"
  
  vpc_security_group_ids = [aws_security_group.backend_sg.id]
  user_data              = file("backend_user_data.sh")

  tags = {
    Name = "HealthPlus-Backend"
  }
}

resource "aws_instance" "frontend_server" {
  ami           = "ami-0f5ee92e2d63afc18" # Ubuntu 22.04 (Mumbai)
  instance_type = "t3.micro"
  
  vpc_security_group_ids = [aws_security_group.frontend_sg.id]
  
  # Use 'templatefile' to pass the backend IP to the frontend script
  user_data = templatefile("frontend_user_data.sh", {
    backend_ip = aws_instance.backend_server.public_ip 
  })

  tags = {
    Name = "HealthPlus-Frontend"
  }
  
  # Ensure backend is created first so we have its IP
  depends_on = [aws_instance.backend_server]
}

# --- Outputs ---

output "frontend_public_ip" {
  value = aws_instance.frontend_server.public_ip
}

output "backend_public_ip" {
  value = aws_instance.backend_server.public_ip
}
