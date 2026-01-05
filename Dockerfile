# Estágio 1: Instalação de dependências
FROM oven/bun:1 AS deps
WORKDIR /app

# Copia arquivos de configuração de pacotes
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Estágio 2: Build da aplicação
FROM oven/bun:1 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Desabilita telemetria do Next.js durante o build se desejar
ENV NEXT_TELEMETRY_DISABLED 1

RUN bun run build

# Estágio 3: Runner (Imagem final)
FROM oven/bun:1-slim AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Cria um usuário não-root para segurança
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copia apenas o necessário do estágio de build
# O Next.js gera o standalone output que é ideal para Docker
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# O standalone output usa o node/bun internamente para rodar o server.js
CMD ["bun", "server.js"]
