# 1. Base image: Ismein pehle se Node installed hai
FROM node:18-alpine

# 2. Container ke andar folder banaiye
WORKDIR /app

# 3. Pehle package files copy kijiye (asla-barood ki list)
COPY package*.json ./

# 4. Saari libraries install kijiye container ke andar
RUN npm install

# 5. Baaki ka saara code copy kijiye
COPY . .

# 6. Port 3000 kholiye
EXPOSE 3000

# 7. App shuru karne ki command
CMD ["node", "index.js"]