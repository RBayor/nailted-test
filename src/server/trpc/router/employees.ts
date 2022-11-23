import { promises as fs } from "fs";
import Papa from "papaparse";
import path from "path";
import { z } from "zod";

import { publicProcedure, router } from "../trpc";

type Employee = {
  id: string;
  name: string;
  surname: string;
  address: string;
  phone: string;
  email: string;
  birthdate: string;
};

const zEmployee = z.object({
  name: z.string(),
  surname: z.string(),
  address: z.string(),
  phone: z.string(),
  email: z.string(),
  birthdate: z.string(),
});

const headers = "id,name,surname,address,phone,email,birthdate\n";

export const fetchemployeeRouter = router({
  allEmployees: publicProcedure.query(async () => {
    const csvDir = path.join(process.cwd(), "/public/csv");

    const fileData = await fs.readFile(csvDir + "/testfile.txt", "utf8");

    const withHeaders = headers.concat(fileData);
    const jsonData = Papa.parse<Employee>(withHeaders, { header: true });

    return {
      employees: jsonData,
    };
  }),

  addEmployee: publicProcedure
    .input(zEmployee)
    .mutation(async ({ ctx, input }) => {
      const csvDir = path.join(process.cwd(), "/public/csv");
      const fileData = await fs.readFile(csvDir + "/testfile.txt", "utf8");
      const jsonData = Papa.parse<Employee>(fileData);
      const nextIndex = jsonData.data.length;

      const { name, surname, address, phone, email, birthdate } = input;
      const csv = `${nextIndex},${name},${surname},"${address}",${phone},${email},${birthdate}\n`;

      await fs.appendFile(csvDir + "/testfile.txt", csv);

      return {
        data: input,
      };
    }),
});
