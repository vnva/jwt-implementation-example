FROM node:19-alpine as build
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build:backend
EXPOSE 3000
CMD [ "node", "apps/backend/build/index.js" ]
