import { router } from "../trpc";
import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { guestbookRouter } from "./guestbook";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  guestbook: guestbookRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
