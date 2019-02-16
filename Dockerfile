FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN wget http://security.ubuntu.com/ubuntu/pool/main/a/apt/apt_1.0.1ubuntu2.17_amd64.deb -O apt.deb
RUN dpkg -i apt.deb
RUN apt-get update
RUN apt-get install python3.6
RUN npm install -g nodemon

RUN python -v
RUN node -v

RUN npm install

EXPOSE 8080

RUN npm start
