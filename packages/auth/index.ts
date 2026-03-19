import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-dev-only';

export interface TokenPayload {
  userId: string;
  role: string;
  tenantId: string;
}

export const signToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
};

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hashed: string): Promise<boolean> => {
  return bcrypt.compare(password, hashed);
};

export const roles = {
  ADMIN: 'ADMIN',
  COACH: 'COACH',
  MEMBER: 'MEMBER',
} as const;

export type Role = keyof typeof roles;

export * from './oauth';

export const hasRole = (userRole: string, allowedRoles: Role[]): boolean => {
  return allowedRoles.includes(userRole as Role);
};
