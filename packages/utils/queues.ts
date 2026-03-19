import { createQueue } from '@repo/utils';

export const aiQueue = createQueue('ai-tasks');
export const videoQueue = createQueue('video-processing');
export const analyticsQueue = createQueue('analytics-aggregation');

export const queueTask = async (queueName: string, taskType: string, data: any) => {
  const queue = createQueue(queueName);
  await queue.add(taskType, data, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000,
    },
  });
};
