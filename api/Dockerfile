FROM node:24-alpine
WORKDIR /usr/app

COPY package.json package-lock.json ./
RUN npm ci

COPY api/ ./api
EXPOSE 8000
CMD ["npm", "run", "docker_dev"]
