import { prisma } from '@repo/database';

export const getAnalytics = async (tenantId?: string) => {
  // Mocking aggregation for demo
  const mrr = await prisma.subscription.count({ where: { status: 'active' } }) * 200; // Average price
  const ltv = mrr / 0.05; // Churn mock
  const activeUsers = await prisma.user.count({
    where: {
      tenantId: tenantId || undefined,
      lastActive: { gte: new Date(Date.now() - 24 * 3600 * 1000) }
    }
  });

  return {
    mrr,
    ltv,
    activeUsers,
    retention: '92%',
    churn: '4.5%'
  };
};
