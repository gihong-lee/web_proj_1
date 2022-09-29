FROM node:15.14-slim

WORKDIR /app

COPY ./package*.json /app/
COPY ./lib/ /app/lib/
COPY ./javascript/ /app/javascript/

RUN npm install

COPY ./update.js /app

EXPOSE 8000

CMD ["node", "/app/update.js"]