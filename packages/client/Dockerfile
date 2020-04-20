FROM node:12.0.0-alpine

ENV HOME=/usr/app

RUN addgroup -S app
RUN adduser -h $HOME/ -S -G app app

ENV NODE_ENV=production

COPY package*.json $HOME/www/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/www/

RUN npm config set registry http://dadhx05.interno:8081/repository/npm-group/
RUN npm install --verbose
RUN npm cache clean --force

USER root

COPY . $HOME/www/
RUN npm run build
RUN mv $HOME/www/build $HOME/build
#RUN rm -rf $HOME/www
RUN mv $HOME/build $HOME/www
RUN chown -R app:app $HOME/*

USER app

CMD [ "node", "-v" ]
