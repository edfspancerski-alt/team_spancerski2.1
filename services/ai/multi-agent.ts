import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const callAgent = async (systemPrompt: string, userPrompt: string) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    response_format: { type: 'json_object' },
  });
  return JSON.parse(response.choices[0].message.content || '{}');
};

// 1. Personal Trainer Agent
export const coachAgent = async (profile: any) => {
  const system = `Você é um Arquiteto de Fitness de Elite. Sua missão é gerar programas de treinamento (8-12 semanas) combinando Dorian Yates (intensidade), Pacholok (biomecânica) e periodização moderna.`;
  return callAgent(system, JSON.stringify(profile));
};

// 2. Nutritionist Agent
export const nutritionAgent = async (profile: any) => {
  const system = `Você é um Nutricionista Esportivo de Elite. Gere planos alimentares, listas de compras e custos estimados baseados no orçamento e objetivo do usuário. Proteína: 1.8-2.2g/kg.`;
  return callAgent(system, JSON.stringify(profile));
};

// 3. Progress Analyst Agent
export const progressAgent = async (history: any) => {
  const system = `Você é um Analista de Progresso de IA. Detecte estagnação e ajuste volume/carga ou calorias da dieta automaticamente.`;
  return callAgent(system, JSON.stringify(history));
};

// 4. Recovery Coach Agent
export const recoveryAgent = async (status: any) => {
  const system = `Você é um Coach de Recuperação. Forneça protocolos de sono, mobilidade, deload e gerenciamento de estresse.`;
  return callAgent(system, JSON.stringify(status));
};

// 5. Motivation Coach Agent
export const motivationAgent = async (user: any) => {
  const system = `Você é um Coach de Motivação. Gere mensagens diárias inspiradoras e comemorações de conquistas.`;
  return callAgent(system, JSON.stringify(user));
};

// 6. Body Analysis Agent (CV Mock)
export const bodyAnalysisAgent = async (images: any) => {
  const system = `Você é um Especialista em Composição Corporal. Analise (via descrição da imagem) o percentual de gordura, simetria e pontos fracos (ex: glúteos, ombros).`;
  return callAgent(system, JSON.stringify(images));
};
