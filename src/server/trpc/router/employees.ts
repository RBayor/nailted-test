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
  name: z.string().min(1),
  surname: z.string().min(1),
  address: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().min(1),
  birthdate: z.string().min(1),
});

const headers = "id,name,surname,address,phone,email,birthdate\n";

export const fetchemployeeRouter = router({
  allEmployees: publicProcedure.query(async () => {
    const jsonData = (await parseEmplooyeeFile()).data;

    return {
      employees: jsonData,
    };
  }),

  addEmployee: publicProcedure
    .input(zEmployee)
    .mutation(async ({ ctx, input }) => {
      const { csvDir, data } = await parseEmplooyeeFile();

      const nextIndex = Number(data.data.slice(-1)[0]?.id) + 1;
      const { name, surname, address, phone, email, birthdate } = input;

      const csv = `\n${nextIndex},${name},${surname},"${address}",${phone},${email},${birthdate}`;

      await fs.appendFile(csvDir + "/employees.txt", csv);

      return {
        data: input,
      };
    }),
});

const parseEmplooyeeFile = async () => {
  const csvDir = path.join(process.cwd(), "/public/csv");

  const fileData = await fs.readFile(csvDir + "/employees.txt", "utf8");

  const withHeaders = headers.concat(fileData);
  return {
    csvDir,
    data: Papa.parse<Employee>(withHeaders, { header: true }),
  };
};
