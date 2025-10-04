FROM mcr.microsoft.com/playwright/node:lts
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

