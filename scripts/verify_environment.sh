#!/bin/bash

datetime=$(date)
versionOutput() {
    echo "$1: " $($1 --version) | tee -a ../log.txt
}

echo "----------Initialzing txt file for output----------" > ../log.txt
echo "Welcome, ${USER}" | tee -a ../log.txt
echo "This scripts checks the required programs and dependencies" | tee -a ../log.txt
echo "Operating system: " $(uname -srm) | tee -a ../log.txt
versionOutput git
versionOutput npm
versionOutput node
echo "Script started: $datetime" | tee -a ../log.txt
datetime=$(date)
echo "Script ended: $datetime" | tee -a ../log.txt
cat ../log.txt
