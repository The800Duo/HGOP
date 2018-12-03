#!/bin/bash

GIT_COMMIT=$1

cd itemrepository
sudo docker build -t The800Duo/HGOP:$GIT_COMMIT .

#TODO