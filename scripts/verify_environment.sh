#!/bin/bash
datetime=$(date)
echo "Welcome, ${USER}"
echo "This scripts checks the required programs and dependencies"
echo "Operating system: " $(uname -srm)
echo "Script started: $datetime"
datetime=$(date)
echo "Script ended: $datetime" 
