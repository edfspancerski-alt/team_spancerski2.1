import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const videoAgent = async (videoUrl: string) => {
  const prompt = `Analise o vídeo no URL ${videoUrl} e forneça feedback sobre a execução do exercício.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [{ role: 'user', content: prompt }],
  });

  return response.choices[0].message.content;
};