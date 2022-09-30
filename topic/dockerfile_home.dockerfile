FROM node:15.14-slim

WORKDIR /app

COPY ./package*.json /app/
COPY ./lib/ /app/lib/
COPY ./javascript/ /app/javascript/

RUN chmod 777 /app/
RUN npm install

COPY ./topic.js /app

EXPOSE 8000

CMD ["node", "/app/topic.js"]