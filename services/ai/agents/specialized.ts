import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const videoAnalysisAgent = async (userId: string, videoUrl: string) => {
  // In a real scenario, we'd use GPT-4o or a specialized Pose Estimation model
  // Here we simulate the logic for joint angle and form analysis
  const response = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'Você é um Analista de Movimento Biomecânico. Analise a forma do exercício e identifique erros de postura.' },
      { role: 'user', content: `Analise este vídeo de execução: ${videoUrl}` }
    ],
    response_format: { type: 'json_object' }
  });

  return JSON.parse(response.choices[0].message.content || '{}');
};

export const behavioralAnalystAgent = async (userId: string, metrics: any) => {
  const prompt = `Analise os seguintes padrões de comportamento: ${JSON.stringify(metrics)}.
  Identifique se o usuário está perdendo consistência e sugira ajustes no programa para evitar o abandono.`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [{ role: 'user', content: prompt }],
  });

  return response.choices[0].message.content;
};
