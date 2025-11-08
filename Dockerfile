FROM node:22-alpine AS builder

WORKDIR /app

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm i --frozen-lockfile

COPY . .

RUN pnpm run generate

FROM nginx:stable-alpine

COPY --from=builder /app/.output/public /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]