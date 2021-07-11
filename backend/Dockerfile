FROM node:lts-alpine

RUN mkdir -p /home/node/api/node_modules && chown -R node:node /home/node/api

WORKDIR /home/node/api

COPY ./package*.json .

RUN apk update && apk add python3 make g++

RUN yarn

USER node

COPY --chown=node:node . .

EXPOSE 3333

CMD yarn start