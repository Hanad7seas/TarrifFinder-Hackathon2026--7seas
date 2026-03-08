FROM node:18-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY package*.json ./
RUN npm ci

COPY prisma ./prisma/
RUN npx prisma generate

COPY . .
RUN ./node_modules/.bin/tsc

EXPOSE 5000

CMD ["node", "dist/index.js"]
