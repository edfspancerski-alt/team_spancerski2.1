// packages/database/prisma/prisma.config.ts

import { PrismaClientOptions } from '@prisma/client/runtime/library';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
 console.warn("DATABASE_URL is not set in the environment variables. PrismaClient might not connect.");
}

export const prismaClientOptions: PrismaClientOptions = {
  datasources: {
    db: {
      url: DATABASE_URL,
    },
  },
};