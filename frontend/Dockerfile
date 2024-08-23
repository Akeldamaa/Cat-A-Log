FROM node:alpine

WORKDIR /home/app

COPY package*.json .

RUN npm ci

COPY . .

CMD [ "npm", "run", "deploy" ]