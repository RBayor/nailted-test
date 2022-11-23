import { router } from "../trpc";
import { employeesRouter } from "./employees";

export const appRouter = router({
  employees: employeesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
