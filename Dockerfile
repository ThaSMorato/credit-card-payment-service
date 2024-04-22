FROM node:20.11.1-alpine

WORKDIR /app

EXPOSE 3333

COPY package.json ./

RUN npm i -g pnpm

RUN pnpm i

COPY . ./

CMD ["pnpm", "run", "dev"]
