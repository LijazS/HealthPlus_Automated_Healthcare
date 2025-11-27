# terraform/part3-docker-ecs/main.tf

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
  backend "s3" {
    bucket = "healthplus-tf-state-lijaz"
    key    = "healthplus/part3/terraform.tfstate"
    region = "ap-south-1"
  }
}

provider "aws" {
  region = "ap-south-1"
}

# --- 1. ECR Repositories ---
resource "aws_ecr_repository" "backend_repo" {
  name = "healthplus-backend"
  force_delete = true
}

resource "aws_ecr_repository" "frontend_repo" {
  name = "healthplus-frontend"
  force_delete = true
}

# --- 2. Network (VPC) ---
# Using default VPC for simplicity in this demo
data "aws_vpc" "default" {
  default = true
}

data "aws_subnets" "default" {
  filter {
    name   = "vpc-id"
    values = [data.aws_vpc.default.id]
  }
}

resource "aws_security_group" "ecs_sg" {
  name        = "healthplus-ecs-sg"
  description = "Allow HTTP traffic"
  vpc_id      = data.aws_vpc.default.id

  ingress {
    from_port   = 5000
    to_port     = 5000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
  
  ingress {
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

# --- 3. ECS Cluster ---
resource "aws_ecs_cluster" "main" {
  name = "healthplus-cluster"
}

# --- 4. Backend Task & Service ---
resource "aws_ecs_task_definition" "backend_task" {
  family                   = "healthplus-backend-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 256
  memory                   = 512
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([
    {
      name      = "backend-container"
      image     = aws_ecr_repository.backend_repo.repository_url
      essential = true
      portMappings = [{ containerPort = 5000 }]
    }
  ])
}

resource "aws_ecs_service" "backend_service" {
  name            = "healthplus-backend-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.backend_task.arn
  launch_type     = "FARGATE"
  desired_count = 1

  network_configuration {
    subnets          = data.aws_subnets.default.ids
    security_groups  = [aws_security_group.ecs_sg.id]
    assign_public_ip = true
  }
}

# --- 5. Frontend Task & Service ---
resource "aws_ecs_task_definition" "frontend_task" {
  family                   = "healthplus-frontend-task"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 256
  memory                   = 512
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn

  container_definitions = jsonencode([
    {
      name      = "frontend-container"
      image     = aws_ecr_repository.frontend_repo.repository_url
      essential = true
      portMappings = [{ containerPort = 5173 }]
    }
  ])
}

resource "aws_ecs_service" "frontend_service" {
  name            = "healthplus-frontend-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.frontend_task.arn
  launch_type     = "FARGATE"
  desired_count = 1

  network_configuration {
    subnets          = data.aws_subnets.default.ids
    security_groups  = [aws_security_group.ecs_sg.id]
    assign_public_ip = true
  }
}

# --- 6. IAM Role (Required for Fargate) ---
resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ecsTaskExecutionRole_HealthPlus"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [{
      Action = "sts:AssumeRole"
      Effect = "Allow"
      Principal = { Service = "ecs-tasks.amazonaws.com" }
    }]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_task_execution_role_policy" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

output "ecr_backend_url" {
  value = aws_ecr_repository.backend_repo.repository_url
}

output "ecr_frontend_url" {
  value = aws_ecr_repository.frontend_repo.repository_url
}
