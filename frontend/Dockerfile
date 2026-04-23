# Stage 1: Build Stage (Saman banana)
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Production Stage (Saman ko Nginx par sajana)
FROM nginx:stable-alpine
# Build stage se 'dist' folder ko uthakar Nginx ke html folder mein daal dena
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]