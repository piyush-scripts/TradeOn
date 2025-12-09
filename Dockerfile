# -------- Base Stage --------
FROM node:22-alpine AS base

WORKDIR /app

# Copy package files and install all dependencies once
COPY package*.json ./
RUN npm ci

# Copy the rest of the source
COPY . .

# -------- Dev Stage --------
FROM base AS dev

ENV NODE_ENV=development
EXPOSE 3000

# Start Next.js in dev mode (hot reload)
CMD ["npm", "run", "dev"]


# -------- Build Stage --------
FROM base AS build

ENV NODE_ENV=production

# Build the Next.js app (output in .next)
RUN npm run build && npm prune --omit=dev


# -------- Prod Stage --------
FROM node:22-alpine AS prod

WORKDIR /app
ENV NODE_ENV=production
EXPOSE 3000

# Copy production node_modules and built files from build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package*.json ./
COPY --from=build /app/next.config.* ./

# Optional: if using drizzle
COPY --from=build /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=build /app/drizzle ./drizzle
COPY --from=build /app/db ./db

# Start the app
CMD ["npm", "start"]
