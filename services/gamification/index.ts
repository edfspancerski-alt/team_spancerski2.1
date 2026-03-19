import { prisma } from '@repo/database';

export const handleXPEvent = async (userId: string, amount: number, reason: string) => {
  await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { xp: { increment: amount } },
    }),
    prisma.xPLog.create({
      data: { userId, amount, reason },
    }),
  ]);

  // Check for level up
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (user && user.xp >= user.level * 1000) {
    await prisma.user.update({
      where: { id: userId },
      data: { level: { increment: 1 } },
    });
  }
};

export const updateStreak = async (userId: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return;

  const lastActive = user.lastActive || new Date(0);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 3600 * 24));

  if (diffDays === 1) {
    await prisma.user.update({
      where: { id: userId },
      data: { streak: { increment: 1 }, lastActive: now },
    });
  } else if (diffDays > 1) {
    await prisma.user.update({
      where: { id: userId },
      data: { streak: 1, lastActive: now },
    });
  }
};
