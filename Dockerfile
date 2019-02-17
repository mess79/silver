FROM node:10-alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

#RUN npm install -g nodemon

#RUN python -v
#RUN node -v

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]
