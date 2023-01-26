# syntax=docker/dockerfile:1.4

# Create image based on the official Node image from dockerhub
FROM node:19.2-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy dependency definitions
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app


# Install dependecies
#RUN npm set progress=false \
#    && npm config set depth 0 \
#    && npm i install
RUN npm i

# Get all the code needed to run the app
COPY . /usr/src/app

RUN ls -la

# Expose the port the app runs in
EXPOSE 3001

# Serve the app
RUN npm run build
CMD ["npm", "start"]