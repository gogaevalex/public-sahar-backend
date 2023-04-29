FROM node:17.4.0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

# Production use node instead of root
# USER node

RUN yarn install

COPY . /usr/src/app

RUN yarn build

CMD [ "yarn", "start" ]
