FROM node:22-alpine AS base

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

COPY . .

FROM base AS dev

ENV NODE_ENV=development
EXPOSE 3000

CMD ["yarn", "dev"]

FROM base AS build

ENV NODE_ENV=production

RUN yarn build && yarn install --production --frozen-lockfile

FROM node:22-alpine AS prod

WORKDIR /app
ENV NODE_ENV=production
EXPOSE 3000

COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package.json /app/yarn.lock ./
COPY --from=build /app/next.config.* ./

COPY --from=build /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=build /app/drizzle ./drizzle
COPY --from=build /app/db ./db

CMD ["yarn", "start"]
