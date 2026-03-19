import { Queue, Worker, Job } from 'bullmq';
import Redis from 'ioredis';

const redisConnection = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

export const createQueue = (name: string) => {
  return new Queue(name, { connection: redisConnection });
};

export const createWorker = (name: string, processor: (job: Job) => Promise<void>) => {
  return new Worker(name, processor, { connection: redisConnection });
};

export const eventBus = {
  publish: async (queueName: string, eventName: string, data: any) => {
    const queue = createQueue(queueName);
    await queue.add(eventName, data);
  }
};
