import OpenAI from 'openai';
import { prisma } from '@repo/database';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const getRelevantKnowledge = async (query: string) => {
  const embeddingResponse = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: query,
  });
  const embedding = embeddingResponse.data[0].embedding;

  // Manual pgvector query (Prisma Unsupported bypass)
  const results: any[] = await prisma.$queryRaw`
    SELECT id, title, content, category,
    (embedding <=> ${embedding}::vector) as distance
    FROM "KnowledgeBase"
    ORDER BY distance ASC
    LIMIT 5
  `;

  return results;
};

export const getRAGResponse = async (userId: string, userMessage: string) => {
  const knowledge = await getRelevantKnowledge(userMessage);
  const contextText = knowledge.map(k => `[${k.category}] ${k.content}`).join('\n');

  const userMemory = await prisma.userMemory.findUnique({ where: { userId } });
  const memoryContext = userMemory ? JSON.stringify(userMemory.context) : 'No previous history';

  const systemPrompt = `Você é um Digital Fitness Coach de Elite. Combine os conhecimentos recuperados abaixo com a memória comportamental do usuário para dar a melhor resposta.

  CONHECIMENTO TÉCNICO:
  ${contextText}

  MEMÓRIA DO USUÁRIO:
  ${memoryContext}`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ],
  });

  return response.choices[0].message.content;
};
