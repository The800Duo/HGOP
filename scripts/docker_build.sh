#!/bin/bash

GIT_COMMIT=$1

cd game-api
docker build -t arnimegg/hgop:$GIT_COMMIT .

#TODO