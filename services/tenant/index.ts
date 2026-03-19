import { prisma } from '@repo/database';

export const getTenantByDomain = async (domain: string) => {
  return await prisma.tenant.findUnique({
    where: { domain },
  });
};

export const createTenant = async (data: { name: string, slug: string, domain?: string }) => {
  return await prisma.tenant.create({
    data,
  });
};

export const getTenantConfig = async (tenantId: string) => {
  const tenant = await prisma.tenant.findUnique({
    where: { id: tenantId },
  });
  return {
    name: tenant?.name,
    logo: tenant?.logo,
    colors: {
      primary: tenant?.primaryColor,
    },
  };
};
