import { promises as fs } from "fs";
import Papa from "papaparse";
import path from "path";

import { publicProcedure, router } from "../trpc";

export type Employee = {
  id: string;
  name: string;
  surname: string;
  address: string;
  phone: string;
  email: string;
  birthdate: string;
};

const headers = "id,name,surname,address,phone,email,birthdate\n";

export const employeesRouter = router({
  allEmployees: publicProcedure.query(async () => {
    const csvDir = path.join(process.cwd(), "/public/csv");

    const fileData = await fs.readFile(csvDir + "/employees.txt", "utf8");

    const withHeaders = headers.concat(fileData);
    const jsonData = Papa.parse<Employee>(withHeaders, { header: true });

    return {
      employees: jsonData,
    };
  }),
});
