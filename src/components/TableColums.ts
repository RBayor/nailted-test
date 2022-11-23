import { createColumnHelper } from "@tanstack/react-table";

export type Employee = {
  id: string;
  name: string;
  surname: string;
  address: string;
  phone: string;
  email: string;
  birthdate: string;
};

const employeeColumnHelper = createColumnHelper<Employee>();

export const employeeTableColumns = [
  employeeColumnHelper.accessor((row) => row.id, {
    id: "id",
    cell: (info) => info.getValue(),
    header: () => "User ID",
  }),
  employeeColumnHelper.accessor((row) => row.name, {
    id: "name",
    cell: (info) => info.getValue(),
    header: () => "First Name",
  }),
  employeeColumnHelper.accessor((row) => row.surname, {
    id: "surname",
    cell: (info) => info.getValue(),
    header: () => "Surname",
  }),
  employeeColumnHelper.accessor((row) => row.address, {
    id: "address",
    cell: (info) => info.getValue(),
    header: () => "Address",
  }),
  employeeColumnHelper.accessor((row) => row.phone, {
    id: "phone",
    cell: (info) => info.getValue(),
    header: () => "Phone",
  }),
  employeeColumnHelper.accessor((row) => row.email, {
    id: "email",
    cell: (info) => info.getValue(),
    header: () => "Email",
  }),
  employeeColumnHelper.accessor((row) => row.birthdate, {
    id: "birth_date",
    cell: (info) => info.getValue(),
    header: () => "Birth Date",
  }),
];
