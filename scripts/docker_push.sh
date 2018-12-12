#!/bin/bash

GIT_COMMIT=$1

docker push arnimegg/hgop:$GIT_COMMIT || exit 1

docker push arnimegg/hgop:game-ui || exit 1

# TODO exit on error if any command fails