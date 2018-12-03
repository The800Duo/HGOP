#!/bin/bash

GIT_COMMIT=$1

cd itemrepository
docker build -t arnimegg/hgop:$GIT_COMMIT .

#TODO