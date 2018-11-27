#Sets the base image to use from nodejs 10
FROM node:dubnium   
#Sets the work directory
WORKDIR /code
#Copies our package.json to the image file system
COPY package.json package.json
#Copies our database.js to the image file system
COPY database.js database.js
#Copies our app.js to the image file system
COPY app.js app.js
#Execute npm install on top of the current image as a new layer and commits the results
RUN npm install
#Sets app.js as an default for an executing container
CMD node app.js