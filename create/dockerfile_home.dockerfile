FROM node:15.14-slim

WORKDIR /app

COPY ./package*.json /app/
COPY ./lib/ /app/lib/
COPY ./javascript/ /app/javascript/

RUN chmod 777 /app/
RUN mkdir -p /app/sessions
RUN npm install

COPY ./create.js /app

EXPOSE 8000

CMD ["node", "/app/create.js"]