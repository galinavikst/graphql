import { MemberType, MemberTypeId } from './types/memberTypes.js';
import { GraphQLObjectType, GraphQLNonNull, GraphQLList } from 'graphql';
import { PrismaClient } from '@prisma/client';
import { Post } from './types/post.js';
import { UUIDType } from './types/uuid.js';
import { User } from './types/user.js';

interface GraphQLContext {
  prisma: PrismaClient;
}

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    memberTypes: {
      type: new GraphQLNonNull(new GraphQLList(MemberType)),
      resolve: async (_, __, context: GraphQLContext) => {
        const types = await context.prisma.memberType.findMany();
        return types;
      },
    },

    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(MemberTypeId) },
      },
      resolve: async (_, arg: { id: string }, context: GraphQLContext) => {
        return await context.prisma.memberType.findUnique({ where: { id: arg.id } });
      },
    },

    posts: {
      type: new GraphQLNonNull(new GraphQLList(Post)),
      resolve: async (_, __, context: GraphQLContext) => {
        return await context.prisma.post.findMany();
      },
    },

    post: {
      type: Post,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, arg: { id: string }, context: GraphQLContext) =>
        await context.prisma.post.findUnique({ where: { id: arg.id } }),
    },

    users: {
      type: new GraphQLNonNull(new GraphQLList(User)),
      resolve: async (_, __, context: GraphQLContext) => {
        return await context.prisma.user.findMany();
      },
    },

    user: {
      type: User as GraphQLObjectType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, arg: { id: string }, context: GraphQLContext) =>
        await context.prisma.user.findUnique({ where: { id: arg.id } }),
    },
  },
});

export default RootQuery;
