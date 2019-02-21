
FROM node:10
ENV NODE_ENV production
USER root

# Create app directory
#RUN mkdir -p /usr/src/app
#WORKDIR /usr/src/app

ADD /App /App
WORKDIR /App
RUN npm install

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./
#COPY *.* ./

#RUN wget http://download.qt.io/official_releases/qt/5.7/5.7.0/qt-opensource-linux-x64-5.7.0.run
#RUN chmod +x qt-opensource-linux-x64-5.7.0.run
#RUN ./qt-opensource-linux-x64-5.7.0.run
#docker build -t mess79/silver-docker .
#RUN apt-get install build-essential
#RUN apt-get install libfontconfig1
#RUN apt-get install mesa-common-dev

#RUN apt-get update && apt-get install -y \
#  Qt5Core \
#  Qt5Gui \
#  poppler-qt5 \
#  cairo

#RUN npm install -g nodemon
#RUN python -v
#RUN node -v

#RUN npm install

USER 1001

ENV PORT 80
EXPOSE ${PORT}

CMD ["npm", "start"]
