FROM node:22-alpine

WORKDIR /app

# Copy root lockfiles
COPY package.json yarn.lock ./

# Copy package configurations
COPY engine/package.json ./engine/

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the entire workspace (including shared /lib and /engine)
COPY . .

WORKDIR /app/engine

EXPOSE 4000

CMD ["npx", "tsx", "src/index.ts"]
