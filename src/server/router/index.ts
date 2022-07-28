// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { webhookRouter } from "./webhook";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("webhook.", webhookRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
