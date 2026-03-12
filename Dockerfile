# Stage 1: Build Node.js app
FROM node:18-alpine AS build

# Build için gerekli paketler (bash, python3, make, g++)
RUN apk add --no-cache bash python3 make g++

WORKDIR /app

# package.json ve package-lock.json kopyala
COPY package*.json ./

# Bağımlılıkları yükle
RUN npm install

# Proje dosyalarını kopyala
COPY . .

# Next.js siteyi build et ve export ile statik HTML oluştur
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:alpine

# Build edilen statik dosyaları Nginx root'a kopyala
COPY --from=build /app/out /usr/share/nginx/html

# Kendi Nginx config dosyanı kopyala
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]