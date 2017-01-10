FROM node:7.4.0

COPY [".", "/usr/src/"]

WORKDIR /usr/src

RUN npm install

EXPOSE 2301 8301 9301

CMD ["./bin/start"]
