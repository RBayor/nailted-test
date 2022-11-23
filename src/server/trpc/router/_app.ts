import { router } from "../trpc";
import { fetchemployeeRouter } from "./employees";

export const appRouter = router({
  employees: fetchemployeeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
