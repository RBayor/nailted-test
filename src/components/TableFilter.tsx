import type { Column, Table } from "@tanstack/react-table";
import React from "react";
import { DebouncedInput } from "./DebouncedInput";

export const TableFilter = <T, F>({
  column,
  table,
}: {
  column: Column<T, F>;
  table: Table<T>;
}) => {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  return typeof firstValue === "number" ? (
    <DebouncedInput
      type="number"
      min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
      value={(columnFilterValue as [number, number])?.[0] ?? ""}
      onChange={(value) =>
        column.setFilterValue((old: [number, number]) => [value, old?.[1]])
      }
      placeholder="search..."
      className="w-36 rounded border shadow"
    />
  ) : (
    <DebouncedInput
      type="text"
      value={(columnFilterValue ?? "") as string}
      onChange={(value) => column.setFilterValue(value)}
      placeholder={`Search...`}
      className="w-36 rounded border shadow"
      list={column.id + "list"}
    />
  );
};
