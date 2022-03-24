FROM node:alpine AS builder

ENV NODE_ENV production

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm install --production

COPY . .

ENV REACT_APP_API_URL http://localhost:3000/api/v1

RUN npm run build

FROM nginx:1.21.0-alpine AS production

ENV NODE_ENV production

COPY --from=builder /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
