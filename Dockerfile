FROM node:7.4.0

COPY ./package.json /usr/src/

WORKDIR /usr/src

RUN npm install

RUN apt-get update && apt-get install -y --no-install-recommends xvfb libgtk2.0-0 libxtst-dev libxss-dev libgconf2-dev libnss3 libasound2-dev

COPY . /usr/src/

EXPOSE 2301 8301 9301

VOLUME "/data"

CMD ./bin/start
