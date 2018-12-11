#Sets the base image to use from nodejs 10
FROM node:dubnium   
#Sets the work directory
WORKDIR /code
#Copies every local file that is needed to run our game
#Except those who are in dockerignore
COPY . .

RUN npm install --production
#Sets app.js as an default for an executing container
CMD sleep 5 && npm run migratedb:pg && node app.js