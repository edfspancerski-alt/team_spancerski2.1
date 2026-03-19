import { prisma } from '@repo/database';

export const updateUserMemory = async (userId: string, newInteraction: any) => {
  const memory = await prisma.userMemory.findUnique({ where: { userId } });

  const currentContext = (memory?.context as any) || { interactions: [], performance: {} };
  currentContext.interactions.push({
    date: new Date(),
    ...newInteraction
  });

  // Limit memory to last 50 events for context window management
  if (currentContext.interactions.length > 50) {
    currentContext.interactions.shift();
  }

  await prisma.userMemory.upsert({
    where: { userId },
    update: { context: currentContext },
    create: { userId, context: currentContext }
  });
};

export const getBehavioralContext = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { memory: true }
  });

  return {
    consistency: user?.consistency,
    compliance: user?.complianceScore,
    history: user?.memory?.context
  };
};
