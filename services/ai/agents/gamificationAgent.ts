import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const gamificationAgent = async (userId: string, progress: any) => {
  const prompt = `Com base no progresso do usuário ${userId}, sugira recompensas e desafios para aumentar o engajamento.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
  });

  return response.choices[0].message.content;
};