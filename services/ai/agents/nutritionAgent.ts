import { OpenAI } from '@langchain/openai';

export class NutritionAgent {
  private ai: OpenAI;

  constructor(apiKey: string) {
    this.ai = new OpenAI({ openAIApiKey: apiKey });
  }

  async analyzeMealImage(image: string, userId: string) {
    try {
      // Updated to use .invoke() instead of .call()
      const analysis = await this.ai.invoke(`Analise a imagem: ${image}`);
      return analysis;
    } catch (error: any) {
      console.error('Erro no NutritionAgent:', error.message);
      throw error;
    }
  }
}