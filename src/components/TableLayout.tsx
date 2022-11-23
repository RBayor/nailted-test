import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { flexRender } from "@tanstack/react-table";
import type { Table } from "@tanstack/react-table";
import clsx from "clsx";
import { TableFilter } from "./TableFilter";

type Props<T> = {
  title: string;
  tableInstance: Table<T>;
  rowClassName?: string;
};

const Pages = [10, 20, 30, 40, 50, 100];

export function TableTemplate<T>({ title, tableInstance }: Props<T>) {
  return (
    <>
      <div className="relative mb-6 flex w-full max-w-7xl flex-col rounded bg-violet-900 text-slate-300 shadow-lg">
        <h3 className="p-5 text-left text-3xl font-bold text-white">{title}</h3>
        <div className="block w-full overflow-x-auto">
          <table className="w-full border-collapse items-center bg-transparent">
            <thead>
              {tableInstance?.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="whitespace-nowrap border border-l-0 border-r-0 border-solid border-violet-600  px-6 py-3 text-base font-bold uppercase"
                    >
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        {header.isPlaceholder ? null : (
                          <div>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}{" "}
                            {{
                              asc: (
                                <FontAwesomeIcon
                                  className="text-white hover:cursor-pointer"
                                  icon={faArrowUp}
                                  height={16}
                                />
                              ),
                              desc: (
                                <FontAwesomeIcon
                                  className="text-white hover:cursor-pointer"
                                  icon={faArrowDown}
                                  height={16}
                                />
                              ),
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                        )}
                      </div>
                      <div className="mt-5">
                        {header.column.getCanFilter() ? (
                          <TableFilter
                            column={header.column}
                            table={tableInstance}
                          />
                        ) : (
                          <></>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {tableInstance?.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className="text-center text-base odd:bg-purple-800"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="whitespace-nowrap border-t-0 border-l-0 border-r-0 p-4 px-6 align-middle"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex-rol mt-3 flex justify-center text-xl text-orange-500">
            <span className="flex items-center gap-1">
              <div>Page</div>
              <strong>
                {tableInstance?.getState().pagination.pageIndex + 1} of{" "}
                {tableInstance?.getPageCount()}
              </strong>
            </span>
          </div>

          <div className="flex-rol flex w-full justify-center gap-3 p-5 text-orange-500">
            <button
              className={clsx(
                "rounded p-2 text-sm",
                tableInstance.getCanPreviousPage()
                  ? "bg-green-500 text-white hover:bg-green-700"
                  : "bg-slate-200 text-orange-500 hover:bg-slate-300"
              )}
              onClick={() => tableInstance.setPageIndex(0)}
              disabled={!tableInstance.getCanPreviousPage()}
            >
              First Page
            </button>
            <button
              className={clsx(
                "rounded p-2 text-sm",
                tableInstance.getCanPreviousPage()
                  ? "bg-green-500 text-white hover:bg-green-700"
                  : "bg-slate-200 text-orange-500 hover:bg-slate-300"
              )}
              onClick={() => tableInstance.previousPage()}
              disabled={!tableInstance.getCanPreviousPage()}
            >
              Previous
            </button>
            <button
              className={clsx(
                "rounded p-2 text-sm",
                tableInstance.getCanNextPage()
                  ? "bg-green-500 text-white hover:bg-green-700"
                  : "bg-slate-200 hover:bg-slate-300"
              )}
              onClick={() => tableInstance.nextPage()}
              disabled={!tableInstance.getCanNextPage()}
            >
              Next
            </button>
            <button
              className={clsx(
                "rounded p-2 text-sm",
                tableInstance.getCanNextPage()
                  ? "bg-green-500 text-white hover:bg-green-700"
                  : "bg-slate-200 hover:bg-slate-300"
              )}
              onClick={() =>
                tableInstance.setPageIndex(tableInstance.getPageCount() - 1)
              }
              disabled={!tableInstance.getCanNextPage()}
            >
              Last Page
            </button>

            <select
              className="rounded "
              value={tableInstance?.getState().pagination.pageSize}
              onChange={(e) => {
                tableInstance?.setPageSize(Number(e.target.value));
              }}
            >
              {Pages.map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>

            <span className="flex items-center gap-1 text-base">
              Go to page:
              <input
                type="number"
                defaultValue={tableInstance.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  tableInstance.setPageIndex(page);
                }}
                className="w-16 rounded border p-1"
              />
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
