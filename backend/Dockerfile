# 1. Base image
FROM node:18-alpine

# Security Fix: Create app directory and give permission to 'node' user
RUN mkdir -p /app && chown -R node:node /app

# 2. Container ke andar folder banaiye
WORKDIR /app

# 3. Pehle package files copy kijiye
COPY package*.json ./

# Security Fix: Switch to non-root user before install/copy
USER node

# 4. Saari libraries install kijiye
RUN npm install

# 5. Baaki saara code copy kijiye
COPY --chown=node:node . .

# 6. App start kijiye
CMD ["node", "index.js"]
