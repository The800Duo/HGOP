#!/bin/bash
datetime=$(date)
> ../log.txt
echo "Welcome, ${USER}" | tee ../log.txt
echo "This scripts checks the required programs and dependencies" | tee -a ../log.txt
echo "Operating system: " $(uname -srm) | tee -a ../log.txt
echo "Script started: $datetime" | tee -a ../log.txt
echo $(git --version) | tee -a ../log.txt
echo "NPM version" $(npm --version) | tee -a ../log.txt
echo "Nodejs version" $(node -v) | tee -a ../log.txt
datetime=$(date)
echo "Script ended: $datetime" | tee -a ../log.txt
cat ../log.txt
