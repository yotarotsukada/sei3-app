import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../trpc";

export const guestbookRouter = router({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.guestbook
      .findMany({
        select: {
          name: true,
          message: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      })
      .catch((err) => console.error("error", err));
  }),
  postMessage: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        message: z.string(),
      })
    )
    .mutation(async ({ ctx, input: data }) => {
      await ctx.prisma.guestbook
        .create({ data })
        .catch((err) => console.error("error", err));
    }),
});
