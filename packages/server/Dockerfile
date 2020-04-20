FROM node:12.0.0-alpine

ENV HOME=/usr/app

RUN addgroup -S app && \
    adduser -h $HOME/ -S -G app app

# ENV NODE_ENV=production

COPY package*.json $HOME/www/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/www/

RUN npm config set registry http://dadhx05.interno:8081/repository/npm-group/
#RUN npm ci --production
RUN npm install --verbose

USER root
COPY . $HOME/www/
RUN chown -R app:app $HOME/*

USER app

CMD [ "npm", "start" ]

EXPOSE 2650
