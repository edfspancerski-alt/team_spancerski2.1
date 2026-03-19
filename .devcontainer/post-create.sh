#!/bin/bash

echo "🚀 Iniciando configuração do Codespaces..."

# Instalar dependências
npm install

# Gerar cliente Prisma
cd packages/database && npx prisma generate && cd ../..

# Criar .env inicial a partir do exemplo se não existir
if [ ! -f .env ]; then
  cp .env.example .env
  echo "✅ Arquivo .env criado a partir do .env.example"
fi

echo "✅ Configuração concluída! Use 'npm run dev' para iniciar o projeto."
