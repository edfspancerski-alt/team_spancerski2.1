import { prisma } from '@repo/database';

export const createAffiliate = async (userId: string) => {
  const referralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
  return await prisma.affiliate.create({
    data: {
      userId,
      referralCode,
    },
  });
};

export const trackReferralClick = async (referralCode: string) => {
  const affiliate = await prisma.affiliate.findUnique({
    where: { referralCode },
  });

  if (affiliate) {
    await prisma.referral.create({
      data: {
        affiliateId: affiliate.id,
        clickCount: 1,
      },
    });
  }
};

export const processReferralConversion = async (referralCode: string, referredUserId: string, purchaseAmount: number) => {
  const affiliate = await prisma.affiliate.findUnique({
    where: { referralCode },
  });

  if (affiliate) {
    const commission = purchaseAmount * affiliate.commissionRate;
    await prisma.affiliate.update({
      where: { id: affiliate.id },
      data: { earnings: { increment: commission } },
    });

    await prisma.referral.upsert({
      where: { referredUserId },
      update: {
        conversionCount: { increment: 1 },
        totalCommission: { increment: commission },
      },
      create: {
        affiliateId: affiliate.id,
        referredUserId,
        conversionCount: 1,
        totalCommission: commission,
      },
    });
  }
};
