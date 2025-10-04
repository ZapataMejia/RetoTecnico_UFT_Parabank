FROM node:20


RUN apt-get update && apt-get install -y \
    libnss3 libatk1.0-0 libatk-bridge2.0-0 libgdk-pixbuf2.0-0 libgtk-3-0 libasound2 libxkbcommon-x11-0 \
    libdrm2 libgbm1 libegl1 libgdk-pixbuf-2.0-0 libdbus-glib-1-2 libpangocairo-1.0-0 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install

COPY . .

CMD ["npx", "playwright", "test"]