# Team Spancerski - Guia de Conteúdo e Seed

## Biblioteca de Exercícios
O sistema agora conta com uma biblioteca de mais de 140 exercícios pré-cadastrados, cobrindo:
- Peito, Costas, Pernas, Glúteos, Ombros, Braços, Core e Cardio.
- Diferentes níveis de dificuldade (Iniciante, Intermediário, Avançado).
- Diversos equipamentos (Barra, Halteres, Máquinas, Cabos, Elásticos, Kettlebell).

## Como executar o Seed
Para popular o banco de dados com o conteúdo gerado, siga os passos abaixo:

1. Certifique-se de que o banco de dados Neon está configurado e as migrações foram executadas (`npx prisma db push`).
2. No diretório raiz ou em `packages/database`, execute:
   ```bash
   npx prisma db seed
   ```

## Estrutura dos Dados
Cada exercício inserido possui:
- `name`: Nome do exercício em Português.
- `muscles`: Lista de grupos musculares trabalhados.
- `equipment`: Equipamento necessário.
- `difficulty`: Nível sugerido.
- `instructions`: Guia rápido de execução.
- `demoUrl`: Link para o vídeo demonstrativo (CDN).
