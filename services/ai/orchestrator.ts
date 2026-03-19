import {
  coachAgent,
  nutritionAgent,
  progressAgent,
  recoveryAgent,
  motivationAgent
} from './multi-agent';
import { eventBus } from '@repo/utils';

export const aiOrchestrator = async (userId: string, eventType: string, data: any) => {
  console.log(`Orchestrating AI for user ${userId} on event ${eventType}`);

  switch (eventType) {
    case 'WORKOUT_COMPLETED':
      const progress = await progressAgent(data);
      const motivation = await motivationAgent({ userId, context: 'Great job completing your workout!' });

      await eventBus.publish('notifications', 'SEND_PUSH', {
        userId,
        title: 'Progresso Analisado',
        body: motivation.message
      });
      break;

    case 'PROFILE_UPDATED':
      const newPlan = await nutritionAgent(data);
      const newProgram = await coachAgent(data);
      // Trigger update events...
      break;

    default:
      console.log('No orchestration rule for event:', eventType);
  }
};
