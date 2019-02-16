FROM node:alpine

EXPOSE 80

RUN npm install -g nodemon
RUN nodemon
