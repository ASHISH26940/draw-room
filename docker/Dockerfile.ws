# Use an official PNPM image
FROM octoblu/pnpm:latest

# Set working directory
WORKDIR /usr/src/app

# Copy lockfiles and Turbo config first for better caching
COPY pnpm-lock.yaml package.json turbo.json ./


# Copy packages and apps
COPY packages ./packages
COPY apps/ws-backend ./apps/ws-backend


# Install dependencies efficiently
RUN pnpm install

RUN pnpm run db:migrate

# Build the application
RUN pnpm run build

# Expose the application port
EXPOSE 8080

# Run database migrations before starting (inside CMD)
CMD ["pnpm", "start:ws"]
