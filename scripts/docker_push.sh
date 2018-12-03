#!/bin/bash

GIT_COMMIT=$1

sudo docker push The800Duo/HGOP:$GIT_COMMIT

# TODO exit on error if any command fails