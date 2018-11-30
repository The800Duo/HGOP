#!/bin/bash

# Kill the current session if it is running
echo "Terminating current session if exists ..."
terraform destroy -auto-approve

# Start a new session
echo "Initializing a new terraform session ..."
terraform init

echo "Applying ..."
terraform apply -auto-approve

chmod 400 ~/.aws/GameKeyPair.pem
ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./initialize_game_api_instance.sh"

echo "You are now up and running ..."