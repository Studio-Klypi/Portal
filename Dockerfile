FROM node:22

WORKDIR /app

COPY . .

RUN yarn install

RUN npx prisma generate

CMD npx prisma migrate deploy && npx prisma db seed
CMD yarn build && node .output/server/index.mjs
