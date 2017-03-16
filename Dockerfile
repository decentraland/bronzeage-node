FROM node:7.4.0

RUN apt-get update && apt-get install -y --no-install-recommends xvfb libgtk2.0-0 libxtst-dev libxss-dev libgconf2-dev libnss3 libasound2-dev

RUN mkdir /decentraland

WORKDIR /decentraland

COPY ./package.json /decentraland

RUN npm install

COPY . /decentraland

EXPOSE 2301 8301 9301

CMD /decentraland/bin/start
