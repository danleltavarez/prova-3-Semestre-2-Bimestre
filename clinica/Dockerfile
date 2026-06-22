# ---- Stage 1: Build ----
FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

# ---- Stage 2: Runtime ----
FROM node:24-alpine AS runtime

WORKDIR /app

# Cria usuário não-root para segurança
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app/node_modules ./node_modules
COPY . .

RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000

CMD ["node", "server.js"]
