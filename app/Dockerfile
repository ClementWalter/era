# Simple nginx-based Dockerfile for pre-built React app
FROM nginx:alpine

# Copy pre-built dist folder
COPY dist/ /usr/share/nginx/html/

# SPA routing config
RUN echo 'server { \
    listen 8080; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
