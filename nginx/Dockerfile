FROM nginx:1.27.0-alpine AS base
RUN rm /etc/nginx/conf.d/default.conf

# runs in development mode
FROM base AS dev
COPY ./nginx.dev.conf /etc/nginx/conf.d/nginx.dev.conf
CMD [ "nginx-debug", "-g", "daemon off;" ]

# runs in production mode
FROM base AS prod
COPY ./nginx.conf /etc/nginx/conf.d/nginx.conf
# Copy SSL certificates
COPY ./catalog-trading.fun/certificate.crt /etc/ssl/catalog-trading.fun/certificate.crt
COPY ./catalog-trading.fun/private.key /etc/ssl/catalog-trading.fun/private.key
COPY ./api.catalog-trading.fun/certificate.crt /etc/ssl/api.catalog-trading.fun/certificate.crt
COPY ./api.catalog-trading.fun/private.key /etc/ssl/api.catalog-trading.fun/private.key
CMD ["nginx", "-g", "daemon off;"]