#!/bin/bash

GIT_COMMIT=$1

cd game-api || exit 1
docker build -t arnimegg/hgop:$GIT_COMMIT . || exit 1

cd ../game-client
docker build -t arnimegg/hgop:game-ui . || exit 1

#TODO