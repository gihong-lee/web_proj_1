FROM node:15.14-slim

WORKDIR /app

COPY ./package*.json /app/
COPY ./lib/ /app/
COPY ./javascript/ /app/

RUN npm install

COPY ./topic.js /app

EXPOSE 8000

CMD ["node", "/app/topic.js"]