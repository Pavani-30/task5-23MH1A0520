FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files FIRST
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy rest of frontend code
COPY . .

# Expose React port
EXPOSE 3000

# Start React dev server
CMD ["npm", "start"]
