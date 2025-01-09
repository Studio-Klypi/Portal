FROM node:22

WORKDIR /app

COPY . .

RUN yarn install

RUN npx prisma generate

RUN npx prisma migrate deploy
RUN npx prisma db seed

CMD yarn build && node .output/server/index.mjs
