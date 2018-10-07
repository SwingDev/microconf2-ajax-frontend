FROM node:10.11.0-alpine

# Create directories and ensure good permissions
RUN chown -R root /opt
RUN chmod 755 /usr/local/bin/*

RUN mkdir -p /app
ENV PATH "$PATH:/app/node_modules/.bin"

# Prepare environment
RUN apk --no-cache --update add automake autoconf gcc g++ make python

# npm install
COPY package.json yarn.lock /tmp/
RUN cd /tmp && \
  yarn install -d --frozen-lockfile && \
  yarn cache clean && \
  mv /tmp/node_modules /app/ && \
  apk del automake autoconf gcc g++ make python

ENV PORT=8080
ENV NODE_ENV=production
ARG ENV_FILE=production

# Copy app
WORKDIR /app

COPY . /app/
COPY ./.env.$ENV_FILE /app/.env
RUN yarn build

USER node

CMD yarn start
