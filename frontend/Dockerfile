FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .

# runs in development mode
FROM base AS dev
ENV VITE_API_BASE_URL=http://localhost:8000/
CMD [ "npm", "run", "deploy" ]

# runs in production mode
FROM base AS prod
ENV VITE_API_BASE_URL=https://api.catalog-trading.fun/
CMD [ "npm", "run", "deploy" ]
