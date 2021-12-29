import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const resolvers = {
  Query: {
    allSchools: (parent: any, args: any, context: any, info: any) => {
      console.log('args', args);
      return prisma.school.findMany({
        take: args.first ?? 10,
        skip: args.skip ?? 0,
      });
    },
    allLocalAuthorities: () => {
      return prisma.localAuthorities.findMany({

      })
    },
  },
};
