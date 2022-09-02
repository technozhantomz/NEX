FROM node:16.17.0-alpine3.16

RUN apk update && apk add \
    g++ \
    make \
    nasm \
    git \
    libtool \
    autoconf \
    automake \
    libpng-dev \
    pkgconfig

WORKDIR /app
COPY package*.json /app/
RUN npm install

COPY ./ /app/
EXPOSE 8080
ENTRYPOINT ["npm", "start"]
