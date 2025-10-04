# Usar la imagen oficial de Playwright que ya incluye todas las dependencias.
FROM mcr.microsoft.com/playwright/node:lts-slim 

WORKDIR /app

# Copia los archivos de configuración
COPY package.json package-lock.json ./

# Instala solo las dependencias de Node.js (Playwright ya está preinstalado)
RUN npm install

# Copia el resto de tu código
COPY . .

# Comando por defecto para ejecutar tus tests
CMD ["npx", "playwright", "test"]