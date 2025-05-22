# Stage 1: билд фронтенда
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# Stage 2: nginx для продакшена
FROM nginx:stable-alpine

# Копируем билд
COPY --from=builder /app/dist /usr/share/nginx/html

# Кастомный nginx конфиг (SPA + готовность к API)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
