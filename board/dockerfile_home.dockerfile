FROM node:15.14-slim

WORKDIR /app

COPY ../package*.json /app/
COPY ../lib/ /app/
COPY ../javascript/ /app/

RUN npm install

COPY ./board.js /app

EXPOSE 3000

CMD ["node", "/app/board.js"]