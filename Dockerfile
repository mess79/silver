FROM node:10
ENV NODE_ENV production
USER root

# Create app directory
ADD /app /App
WORKDIR /App

RUN apt-get update && apt-get -y install curl \
  qt5-default \
  libcairo2-dev \
  libpoppler-qt5

RUN npm install

USER 1001

ENV PORT 8080
EXPOSE ${PORT}

CMD ["npm", "start"]
