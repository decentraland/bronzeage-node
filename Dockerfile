FROM node:7.4.0

COPY ["./package.json", "/usr/src/"]

WORKDIR /usr/src

RUN npm install

COPY [".", "/usr/src/"]

EXPOSE 2301 8301 9301

CMD ["./bin/start"]
