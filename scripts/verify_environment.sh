#!/bin/bash

#stores current date and time when scripts starts
datetime=$(date)
#Initializing version check of all tools in use
os="$(uname -srm | cut -d ' ' -f 1)"
git_version="$(git --version)"
node_version="$(node --version)"
npm_version="$(npm --version)"
aws_version="$(aws --version 2>&1)" 
terraform_version="$(terraform --version)"
docker_version="$(docker --version)"
docker_compose_version="$(docker-compose --version)"

#Initilaizing log.txt clears the file and 
echo "----------Initialzing txt file for output----------" > ./log.txt

#Start of output Welcoming user and loging it to file
echo "Welcome, ${USER}" | tee -a ./log.txt
echo "This scripts checks the required programs and dependencies"

#If OS is not Mac or Linux the program will exit. Else outputs and logs the current version OS
if [[ $os == "Darwin" ]]; then
    printf "Operating System: "
    uname -srm | tee -a ./log.txt
elif [[$os == 'linux-gnu']]; then
    printf "Operating System: "
    uname -srm | tee -a ./log.txt
else
    echo "Os not supported, exiting ..."
    exit 1
fi

#If git exists outputs and logs the version
if [[ "$git_version" ]]; then
    echo "Git version: $git_version" | tee -a ./log.txt
else
    echo "Git version: Not installed"
fi

#If npm exists outputs and logs the version
if [[ "$npm_version" ]]; then
    echo "Npm version: $npm_version" | tee -a ./log.txt
else
    echo "Npm version: Not installed"
fi

#If node exists outputs and logs the version
if [[ "$node_version" ]]; then
    echo "Node version: $node_version" | tee -a ./log.txt
else
    echo "Node version: Not installed"
fi

#If aws exists outputs and logs the version
if [[ "$aws_version" ]]; then
    echo "Aws version: $aws_version" | tee -a ./log.txt
else
    echo "Aws version: Not installed"
fi

#If docker exists outputs and logs the version
if [[ "$docker_version" ]]; then
    echo "Docker version: $docker_version" | tee -a ./log.txt
else
    echo "Docker version: Not installed"
fi

#If docker-compose exists outputs and logs the version
if [[ "$docker_compose_version" ]]; then
    echo "Docker-compose version: $docker_compose_version" | tee -a ./log.txt
else
    echo "Docker-compose version: Not installed"
fi

#If terraform exists outputs and logs the version
if [[ "$terraform_version" ]]; then
    echo "Terraform version: $terraform_version" | tee -a ./log.txt
else
    echo "Terraform version: Not installed"
fi

#Output and log date and time of script starting
echo "Script started: $datetime" | tee -a ./log.txt
#Stores date and time when script finishes
datetime=$(date)

#Output and log date and time of script ending
echo "Script ended: $datetime" | tee -a ./log.txt
#Outputs the log file
cat ./log.txt
