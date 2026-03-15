# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY ipnext-admin/package*.json ./
RUN npm ci

COPY ipnext-admin/ .
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

# nginx config: SPA + reverse proxy al backend
RUN printf 'server {\n\
    listen 8765;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    # Proxy /api/* → backend en la red Docker interna\n\
    location /api/ {\n\
        proxy_pass http://ipnext_backend:8288/api/;\n\
        proxy_http_version 1.1;\n\
        proxy_set_header Host $host;\n\
        proxy_set_header X-Real-IP $remote_addr;\n\
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;\n\
    }\n\
\n\
    # SPA fallback\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 8765

CMD ["nginx", "-g", "daemon off;"]
