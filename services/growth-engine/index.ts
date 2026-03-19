import { prisma } from '@repo/database';
import { eventBus } from '@repo/utils';

export const triggerGrowthEvent = async (userId: string, eventName: string, meta: any) => {
  console.log(`Processing growth trigger: ${eventName} for user ${userId}`);

  const trigger = await prisma.growthTrigger.findFirst({
    where: { name: eventName, isActive: true },
  });

  if (!trigger) return;

  const config = trigger.config as any;

  switch (trigger.action) {
    case 'SEND_NOTIFICATION':
      await eventBus.publish('notifications', 'SEND_PUSH', {
        userId,
        title: config.title,
        body: config.body,
      });
      break;

    case 'AWARD_XP':
      await eventBus.publish('gamification', 'ADD_XP', {
        userId,
        amount: config.amount,
        reason: eventName,
      });
      break;

    default:
      console.log('Action not implemented:', trigger.action);
  }
};
