FROM node:20

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install
RUN npx playwright install --with-deps
COPY . .

CMD ["npx", "playwright", "test"]