FROM node:18-alpine

WORKDIR /app

# Install postgres client for psql & pg_isready
RUN apk add --no-cache postgresql-client

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["sh", "./scripts/start.sh"]
