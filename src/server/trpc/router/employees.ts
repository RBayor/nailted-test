import { promises as fs } from "fs";
import Papa from "papaparse";
import path from "path";

import { publicProcedure, router } from "../trpc";

const headers = "id,name,surname,address,phone,email,birthdate\n";

export const employeesRouter = router({
  allEmployees: publicProcedure.query(async () => {
    const employeeDir = path.join(process.cwd(), "csv");
    const fileData = await fs.readFile(employeeDir + "/employees.txt", "utf8");

    const withHeaders = headers.concat(fileData);
    const jsonData = Papa.parse(withHeaders, { header: true });

    return {
      employees: jsonData,
    };
  }),
});
