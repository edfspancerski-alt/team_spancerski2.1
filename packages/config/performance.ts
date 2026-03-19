export const redisConfig = {
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
};

export const cdnConfig = {
  baseUrl: process.env.CDN_URL || 'https://cdn.teamspancerski.com',
};

export const corsOptions = {
  origin: '*', // Mobile apps need wide access or specific config
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};
