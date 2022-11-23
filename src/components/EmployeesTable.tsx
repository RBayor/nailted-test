import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { type FC, useState } from "react";
import { trpc } from "../utils/trpc";
import { type Employee, employeeTableColumns } from "./TableColums";
import { TableTemplate } from "./TableLayout";

export const EmployeeTable: FC = () => {
  const fetchEmployees = trpc.employees.allEmployees.useQuery();

  const employees = fetchEmployees.data?.employees.data;

  const [sorting, setSorting] = useState<SortingState>([]);
  const [page, setPage] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  });

  const tableInstance = useReactTable({
    data: employees ?? [],
    columns: employeeTableColumns,
    state: {
      sorting,
      pagination: page,
    },
    enableFilters: true,
    enableColumnFilters: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onPaginationChange: setPage,
  });

  return (
    <>
      <TableTemplate<Employee>
        tableInstance={tableInstance}
        title={"Employees"}
      />
    </>
  );
};
