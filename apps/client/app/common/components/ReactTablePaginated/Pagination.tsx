import { useEffect } from "react";
import {
  BsChevronDoubleRight,
  BsChevronDoubleLeft,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";

export default function Pagination({
  table,
  totalRows,
  paginating,
  hidePagination,
}: {
  table: any;
  totalRows: number;
  paginating?: boolean;
  hidePagination?: boolean;
}) {
  const doesCurrentPagePassedLastPage =
    table.getState().pagination?.pageIndex + 1 > table.getPageCount();

  useEffect(() => {
    if (!paginating && doesCurrentPagePassedLastPage) {
      table.setPageIndex(0);
    }
  }, [doesCurrentPagePassedLastPage, paginating, table]);

  return (
    <div className="flex justify-between items-center p-4 border-t border-gray-200 bg-white rounded-b-md">
      <p className="text-xs text-gray-500 select-none">{totalRows} row(s)</p>

      {!hidePagination && (
        <div className="flex items-center space-x-5">
          {paginating && (
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="animate-spin text-gray-500"
              viewBox="0 0 1792 1792"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
            </svg>
          )}

          <select
            className="rounded-md border border-gray-300 bg-white py-1.5 px-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            aria-label="Select page size"
          >
            {[5, 10, 15, 20, 25, 30].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>

          <strong className="text-xs text-gray-700 select-none">
            Page{" "}
            <span>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount() || 0}
            </span>
          </strong>

          <div className="flex items-center gap-2">
            <button
              className="rounded-md border border-gray-300 p-1 hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              aria-label="Go to first page"
            >
              <BsChevronDoubleLeft size={18} />
            </button>
            <button
              className="rounded-md border border-gray-300 p-1 hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Go to previous page"
            >
              <BsChevronLeft size={18} />
            </button>
            <button
              className="rounded-md border border-gray-300 p-1 hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Go to next page"
            >
              <BsChevronRight size={18} />
            </button>
            <button
              className="rounded-md border border-gray-300 p-1 hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              aria-label="Go to last page"
            >
              <BsChevronDoubleRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
