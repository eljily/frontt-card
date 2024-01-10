FROM node:latest as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY ./ .
RUN npm run build --configuration=production
FROM nginx:latest
RUN mkdir /app
COPY --from=build-stage /app/dist/cardmangement-front/ /app
COPY nginx.conf /etc/nginx/nginx.conf
USER nginx
EXPOSE 80