FROM node:lts-alpine as builder
RUN mkdir -p /home/node/react && chown -R node:node /home/node/react
WORKDIR /home/node/react
ENV PATH /home/node/react/node_modules/.bin:$PATH
COPY ./package*.json ./
RUN yarn
USER node
COPY --chown=node:node . .
CMD yarn start

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=builder /home/node/react/build .
COPY ./nginx.conf /opt/bitnami/nginx/conf/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]