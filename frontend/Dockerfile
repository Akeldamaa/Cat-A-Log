FROM node:alpine

WORKDIR /home/app

ENV VITE_API_BASE_URL=https://api.catalog-trading.fun/

COPY package*.json .

RUN npm ci

COPY . .

CMD [ "npm", "run", "deploy" ]