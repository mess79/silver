FROM node:10
ENV NODE_ENV production
USER root

# Create app directory
ADD . /App
WORKDIR /App

RUN apt-get update && apt-get -y install curl \
  qt5-default \
  libcairo2-dev

RUN apt-get -y install libpoppler-qt5-dev

RUN npm install

USER 1001

ENV PORT 8080
EXPOSE ${PORT}

CMD ["npm", "start"]
