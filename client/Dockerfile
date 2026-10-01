FROM node:24-alpine
WORKDIR /usr/app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
EXPOSE 3000
CMD ["npm", "start"]
