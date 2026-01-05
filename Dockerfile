# Estágio 1: Instalação
FROM oven/bun:1 AS deps
WORKDIR /app

# Copia os arquivos de pacotes (usando wildcard para evitar erro se o lock mudar)
COPY package.json *bun.lockb *package-lock.json *yarn.lock ./
RUN bun install --frozen-lockfile

# Estágio 2: Build
FROM oven/bun:1 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN bun run build

# Estágio 3: Runner (Imagem final leve)
FROM oven/bun:1-slim AS runner
WORKDIR /app

# Configurações de ambiente corrigidas para o formato moderno
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copia apenas os artefatos necessários do estágio anterior
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

# O Next.js em modo standalone gera um server.js que o Bun executa perfeitamente
CMD ["bun", "server.js"]
