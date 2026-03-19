import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface UserProfile {
  age: number;
  weight: number;
  height: number;
  goal: string;
  experience: 'iniciante' | 'intermediário' | 'avançado';
  environment: 'casa' | 'academia';
  availability: number;
  dietaryRestrictions?: string;
  budget?: number;
}

export const generateProfessionalProtocol = async (profile: UserProfile) => {
  const prompt = `Você é um engenheiro de software e coach de elite. Sua missão é gerar um protocolo de treinamento e nutrição altamente personalizado seguindo a filosofia de Dorian Yates (intensidade), Pacholok (biomecânica) e ciência moderna.

  DADOS DO USUÁRIO:
  Idade: ${profile.age}
  Peso: ${profile.weight}kg
  Altura: ${profile.height}cm
  Objetivo: ${profile.goal}
  Experiência: ${profile.experience}
  Ambiente: ${profile.environment}
  Disponibilidade: ${profile.availability} dias/semana
  Restrições: ${profile.dietaryRestrictions || 'Nenhuma'}
  Orçamento: R$ ${profile.budget || 'Flexível'}

  Gere um relatório estruturado em 10 seções:
  1. Objetivo do Treino (claro e focado)
  2. Divisão do Treino (cronograma semanal baseado na disponibilidade)
  3. Plano de Treino Semanal (fases: adaptação, hipertrofia, força, deload)
  4. Detalhes do Exercício (Séries, Repetições, Descanso, Ritmo, Carga)
  5. Estratégia de Progressão (sobrecarga progressiva, progressão dupla)
  6. Estratégia de Recuperação (sono, deload, recuperação ativa)
  7. Plano Nutricional (Calorias, Proteínas, Carbos, Gorduras)
  8. Plano Alimentar (Café, Almoço, Jantar, Lanches - simples e econômico)
  9. Lista de Compras (Ingredientes, Quantidades, Custo Estimado)
  10. Recomendações para Acompanhamento (Peso, Força, Fotos)

  Responda estritamente em JSON com as chaves: "trainingProtocol", "nutritionPlan", "shoppingList", "fullReport" (objeto com as 10 seções detalhadas).`;

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [{ role: 'user', content: prompt }],
    response_format: { type: 'json_object' },
  });

  return JSON.parse(response.choices[0].message.content || '{}');
};
