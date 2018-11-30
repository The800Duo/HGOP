#!/bin/bash

# Kill the current session if it is running
terraform destroy -auto-approve

# Start a new session
printf "Initializing a new terraform session\n"
terraform init

printf "Applying...\n"
terraform apply -auto-approve

chmod 400 ~/.aws/GameKeyPair.pem

ssh -o StrictHostKeyChecking=no -i "~/.aws/GameKeyPair.pem" ubuntu@$(terraform output public_ip) "./initialize_game_api_instance.sh"