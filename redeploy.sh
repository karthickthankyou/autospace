#!/bin/bash

# Use this to redeploy the api in the server.

docker pull iamkarthick/autospace:latest

# Check if the container is running
if [ "$(docker ps -q -f name=autospace)" ]; then
    docker stop autospace
    docker rm autospace
fi

# Check if the container exists but it's not running
if [ "$(docker ps -aq -f status=exited -f name=autospace)" ]; then
    docker rm autospace
fi

docker run -d --restart=on-failure --env-file .env -p 3006:3000 --name autospace iamkarthick/autospace
