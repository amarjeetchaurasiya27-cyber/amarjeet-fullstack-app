# 1. Base image
FROM node:18-alpine

# 2. Folder banayein aur permission set karein
RUN mkdir -p /app && chown -R node:node /app

# 3. Work directory set karein
WORKDIR /app

# 4. Files copy karte waqt hi 'node' user ko malik banayein (THE FIX)
COPY --chown=node:node package*.json ./

# 5. User switch karein
USER node

# 6. Ab install makkhan ki tarah chalega
RUN npm install

# 7. Baaki code bhi owner banakar copy karein
COPY --chown=node:node . .

# 8. Start the app
CMD ["node", "index.js"]
