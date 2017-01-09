FROM node:7.4.0

COPY [".", "/usr/src/"]

WORKDIR /usr/src

RUN npm install

EXPOSE 2001 8001 9001

CMD ["./bin/start"]
