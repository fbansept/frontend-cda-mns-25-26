FROM node:24-alpine as build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --configuration production

FROM nginx:lts-alpine
COPY --from=build /app/dist/frontend-cda-mns-25-26 /usr/share/nginx/html

