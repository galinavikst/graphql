import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from 'graphql';
import { PrismaClient } from '@prisma/client';

import {
  User,
  CreateUserInput,
  ICreateUserInput,
  ChangeUserInput,
  IChangeUserInput,
} from './types/user.js';
import {
  Profile,
  CreateProfileInput,
  ICreateProfileInput,
  ChangeProfileInput,
  IChangeProfileInput,
} from './types/profile.js';
import {
  ChangePostInput,
  CreatePostInput,
  IChangePostInput,
  ICreatePostInput,
  Post,
} from './types/post.js';
import { UUIDType } from './types/uuid.js';

interface GraphQLContext {
  prisma: PrismaClient;
}

const Mutations = new GraphQLObjectType({
  name: 'Mutations',
  fields: {
    createUser: {
      type: new GraphQLNonNull(User), // Return type
      args: {
        dto: { type: new GraphQLNonNull(CreateUserInput) }, // Input type
      },
      resolve: async (_, arg: { dto: ICreateUserInput }, context: GraphQLContext) => {
        return await context.prisma.user.create({
          data: { name: arg.dto.name, balance: arg.dto.balance },
        });
      },
    },

    createProfile: {
      type: new GraphQLNonNull(Profile),
      args: {
        dto: { type: new GraphQLNonNull(CreateProfileInput) },
      },
      resolve: async (
        _,
        { dto }: { dto: ICreateProfileInput },
        context: GraphQLContext,
      ) => {
        return await context.prisma.profile.create({ data: dto });
      },
    },

    createPost: {
      type: new GraphQLNonNull(Post),
      args: {
        dto: { type: new GraphQLNonNull(CreatePostInput) },
      },
      resolve: async (_, { dto }: { dto: ICreatePostInput }, context: GraphQLContext) => {
        return await context.prisma.post.create({ data: dto });
      },
    },

    changePost: {
      type: new GraphQLNonNull(Post),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangePostInput) },
      },
      resolve: async (
        _,
        { id, dto }: { id: string; dto: IChangePostInput },
        context: GraphQLContext,
      ) => {
        return await context.prisma.post.update({ where: { id }, data: dto });
      },
    },

    changeProfile: {
      type: new GraphQLNonNull(Profile),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeProfileInput) },
      },
      resolve: async (
        _,
        { id, dto }: { id: string; dto: IChangeProfileInput },
        context: GraphQLContext,
      ) => {
        return await context.prisma.profile.update({ where: { id }, data: dto });
      },
    },

    changeUser: {
      type: new GraphQLNonNull(User),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
        dto: { type: new GraphQLNonNull(ChangeUserInput) },
      },
      resolve: async (
        _,
        { id, dto }: { id: string; dto: IChangeUserInput },
        context: GraphQLContext,
      ) => {
        return await context.prisma.user.update({ where: { id }, data: dto });
      },
    },

    deleteUser: {
      type: new GraphQLNonNull(GraphQLString),
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: { id: string }, context: GraphQLContext) => {
        await context.prisma.user.delete({ where: { id } });
        return 'User deleted successfully'; // Return a success message
      },
    },

    deletePost: {
      type: new GraphQLNonNull(GraphQLString), // Return type is String
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: { id: string }, context: GraphQLContext) => {
        await context.prisma.post.delete({ where: { id } });
        return 'Post deleted successfully';
      },
    },

    deleteProfile: {
      type: new GraphQLNonNull(GraphQLString), // Return type is String
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_, { id }: { id: string }, context: GraphQLContext) => {
        await context.prisma.profile.delete({ where: { id } });
        return 'Profile deleted successfully';
      },
    },
  },
});

export default Mutations;
