# Observação: ajuste os caminhos se o seu projeto estiver em outro lugar.

$root = "C:\Users\telli\.vscode\Teamspancerski-"
$prismaDir = Join-Path $root "packages\database\prisma"

# 1) Limpar dependências antigas
Remove-Item -Recurse -Force (Join-Path $root "node_modules") -ErrorAction SilentlyContinue
Remove-Item -Force (Join-Path $root "package-lock.json") -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force (Join-Path $root "packages\database\node_modules") -ErrorAction SilentlyContinue
Remove-Item -Force (Join-Path $root "packages\database\package-lock.json") -ErrorAction SilentlyContinue

# 2) Reinstalar tudo na raiz
Write-Host "==> Instalando dependências na raiz..."
npm install -C $root

# 3) Remover URL do schema Prisma (se ainda estiver presente)
$schemaPath = Join-Path $prismaDir "schema.prisma"
if (Test-Path $schemaPath) {
  (Get-Content $schemaPath) | ForEach-Object { $_ -replace '^\s*url\s*=.*','' } | Set-Content $schemaPath
}

# 4) Garantir .env para o Prisma CLI e Prisma Client
$envPath = Join-Path $prismaDir ".env"
if (!(Test-Path $envPath)) {
  Write-Host "Digite a DATABASE_URL do Neon (ex.: postgresql://user:pass@host/db?sslmode=require)"
  $dburl = Read-Host
  "DATABASE_URL=\"$dburl\"" | Out-File -Encoding utf8 -FilePath $envPath
} else {
  if (-not (Select-String -Path $envPath -Pattern 'DATABASE_URL')) {
    Write-Host "Digite a DATABASE_URL do Neon (ex.: postgresql://user:pass@host/db?sslmode=require)"
    $dburl = Read-Host
    Add-Content -Path $envPath -Value "DATABASE_URL=\"$dburl\""
  }
}

# 5) Atualizar prisma.config.ts para ler .env
$configPath = Join-Path $prismaDir "prisma.config.ts"
@'
import { PrismaClientOptions } from '@prisma/client/runtime/library';
import dotenv from 'dotenv';
dotenv.config({ path: __dirname + '/.env' });
const DATABASE_URL = process.env.DATABASE_URL;
export const prismaClientOptions: PrismaClientOptions = {
  datasources: { db: { url: DATABASE_URL } }
};
'@ | Set-Content -Path $configPath -Encoding UTF8

# 6) Gerar e aplicar Prisma Client
Write-Host "==> Gerando Prisma Client e aplicando db push..."
cd $root
npx prisma generate
npx prisma db push

# 7) Instalar ts-node/typescript e rodar seed (opcional)
cd (Join-Path $root "packages/database")
npm i -D typescript ts-node
Write-Host "==> Executando seed.ts (se houver)"
npx ts-node prisma/seed.ts