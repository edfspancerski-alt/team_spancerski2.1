import { prisma } from '@repo/database';
import { sendPushNotification } from '../notifications';

export const runInactivityCheck = async () => {
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const inactiveUsers = await prisma.user.findMany({
    where: {
      lastActive: {
        lt: threeDaysAgo,
      },
    },
  });

  for (const user of inactiveUsers) {
    await sendPushNotification(
      user.id,
      'Sentimos sua falta! 🔥',
      'Que tal retomar seu plano de treino hoje?'
    );
  }
};

export const handleProgramCompletion = async (userId: string, programId: string) => {
  console.log(`User ${userId} completed program ${programId}. Triggering automation...`);
  // Logic to recommend next program
};
