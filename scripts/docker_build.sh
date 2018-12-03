#!/bin/bash

GIT_COMMIT=$1

cd itemrepository
docker build -t The800Duo/HGOP:$GIT_COMMIT .

#TODO