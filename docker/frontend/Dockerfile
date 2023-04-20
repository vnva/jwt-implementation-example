# build
FROM node:19-alpine as build
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build:frontend

# caddy
FROM caddy:2.6.4-alpine
COPY docker/frontend/Caddyfile /etc/caddy/Caddyfile
COPY --from=build ./app/apps/frontend/build /usr/share/caddy
EXPOSE 80
