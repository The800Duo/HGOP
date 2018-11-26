#!/bin/bash
datetime=$(date)
echo "Welcome, ${USER}"
echo "This scripts checks the required programs and dependencies"
echo "Operating system: " $(uname -srm)
echo "Script started: $datetime"
datetime=$(date)
echo $(git --version)
echo "NPM version" $(npm --version)
echo "Nodejs version" $(nodejs --version)
echo "Script ended: $datetime" 
