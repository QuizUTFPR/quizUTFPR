FROM node:lts-alpine

RUN mkdir -p /home/node/react && chown -R node:node /home/node/react

WORKDIR /home/node/react

ENV PATH /home/node/react/node_modules/.bin:$PATH


COPY ./package*.json ./

RUN yarn

USER node

COPY --chown=node:node . .

EXPOSE 3000

CMD yarn start