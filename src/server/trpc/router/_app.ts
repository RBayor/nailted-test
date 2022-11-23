import { router } from "../trpc";
import { addEmployeeRouter } from "./addEmployees";
import { fetchemployeeRouter } from "./fetchEmployees";

export const appRouter = router({
  fetchEmployees: fetchemployeeRouter,
  addEmployees: addEmployeeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
