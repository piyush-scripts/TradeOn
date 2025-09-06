# Stage 1: Builder
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy all source
COPY . .

# Build Next.js app
RUN npm run build

# Stage 2: Dev Runtime

FROM node:22-alpine AS dev

WORKDIR /app
ENV NODE_ENV=development

# Install all dependencies
COPY package*.json ./
RUN npm install

# Copy source for hot reload
COPY . .

EXPOSE 3000

# Stage 3: Prod Runtime

FROM node:22-alpine AS prod

WORKDIR /app
ENV NODE_ENV=production

# Install only prod deps + drizzle-kit + ts-node
COPY package*.json ./
RUN npm ci --omit=dev && npm install --no-save drizzle-kit ts-node

# Copy build output and required files
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=builder /app/drizzle ./drizzle
COPY --from=builder /app/db ./db   

EXPOSE 3000