import { prisma } from '@repo/database';

export const joinChallenge = async (userId: string, challengeId: string) => {
  return await prisma.challengeParticipant.create({
    data: {
      userId,
      challengeId,
    },
  });
};

export const updateChallengeScore = async (userId: string, challengeId: string, points: number) => {
  return await prisma.challengeParticipant.update({
    where: {
      userId_challengeId: {
        userId,
        challengeId,
      },
    },
    data: {
      score: { increment: points },
    },
  });
};

export const getLeaderboard = async (challengeId: string) => {
  return await prisma.challengeParticipant.findMany({
    where: { challengeId },
    orderBy: { score: 'desc' },
    take: 100,
    include: { user: { select: { name: true } } },
  });
};
