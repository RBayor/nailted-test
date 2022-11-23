import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import { FC, useState } from "react";
import { trpc } from "../utils/trpc";
import { Employee, employeeTableColumns } from "./TableColums";
import { TableTemplate } from "./TableLayout";

export const EmployeeTable: FC = () => {
  const fetchEmployees = trpc.fetchEmployees.allEmployees.useQuery();
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
