import { sanitizeUrl } from '@braintree/sanitize-url';
import { z } from 'zod';
import { isValidUrl } from '../../utils/isUrl';
import { createRouter } from './context';

const failureThreshold = 5;

export const webhookRouter = createRouter()
  .query('all', {
    async resolve({ ctx }) {
      return await ctx.prisma.webhook.findMany({
        where: {
          failureCount: {
            gt: failureThreshold
          }
        }
      });
    }
  })
  .mutation('add', {
    input: z.object({
      url: z.string().url()
    }),
    async resolve({ ctx, input }) {
      const url = sanitizeUrl(input.url);
      if (!isValidUrl(url)) {
        throw new Error('received an invalid url');
      }
      return await ctx.prisma.webhook.upsert({
        where: {
          url: input.url
        },
        update: {
          isTeams: true,
          failureCount: 0 // reset the failure count
        },
        create: {
          url: input.url,
          isTeams: true,
        }
      })
    }
  })
  .mutation('setFailureCount', {
    input: z.array(z.string().url()),
    async resolve({ ctx, input }) {
      return await ctx.prisma.webhook.updateMany({
        where: {
          url: {
            in: input
          }
        },
        data: {
          failureCount: {
            increment: 1
          }
        }
      })
    }
  });
