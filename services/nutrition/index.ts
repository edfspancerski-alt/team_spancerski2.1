import { prisma } from '@repo/database';

export const getNutritionPlan = async (userId: string) => {
  return await prisma.nutritionPlan.findFirst({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: { shoppingList: true },
  });
};

export const calculateMacros = (weight: number, goal: string) => {
  const protein = weight * 2.2;
  const fats = weight * 0.8;
  // logic...
  return { protein, fats };
};
