provider "aws" {
  region = "us-west-2"
}

resource "aws_ec2_instance" "app_instance" {
  ami           = "ami-0c55b159cbfafe01e"
  instance_type = "t2.micro"
  tags = {
    Name = "streaming-platform-instance"
  }
}

resource "aws_db_instance" "mongo_db" {
  allocated_storage    = 20
  storage_type       = "gp2"
  engine            = "mongo"
  instance_class    = "db.t2.micro"
  name              = "streaming"
  username          = "admin"
  password          = "password"
  skip_final_snapshot = true
}