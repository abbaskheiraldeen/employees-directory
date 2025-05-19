import {
  type ColumnDef,
  type OnChangeFn,
  type PaginationState,
} from "@tanstack/react-table";
import Pagination from "./Pagination";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import useMyReactTable from "./useMyReactTable";
import TableStyle from "./TableStyle";

export default function ReactTablePaginated<DataType>({
  columns,
  data,
  totalRows,
  loading,
  paginating,
  pagination,
  setPagination,
  hidePagination,
  errorMessage,
}: {
  columns: ColumnDef<DataType, any>[];
  data: DataType[];
  totalRows: number;
  loading: boolean;
  paginating?: boolean;
  pagination?: {
    pageIndex: number;
    pageSize: number;
  };
  setPagination?: (updater: OnChangeFn<PaginationState>) => void;
  hidePagination?: boolean;
  errorMessage: string | undefined;
}) {
  const table = useMyReactTable<DataType>({
    columns,
    data,
    pagination,
    setPagination,
    totalRows,
  });

  return (
    <>
      <TableStyle>
        <table className="min-w-full border-collapse table-fixed text-gray-800">
          <TableHead table={table} />
          {loading ? (
            <>
              <SkeletonLoader columnsLength={columns.length} />
              <SkeletonLoader columnsLength={columns.length} />
              <SkeletonLoader columnsLength={columns.length} />
              <SkeletonLoader columnsLength={columns.length} />
              <SkeletonLoader columnsLength={columns.length} />
              <SkeletonLoader columnsLength={columns.length} />
              <SkeletonLoader columnsLength={columns.length} />
            </>
          ) : (
            <TableBody table={table} />
          )}
        </table>

        {!loading && !paginating && data?.length === 0 && (
          <div className="flex items-center py-8 justify-center bg-gray-50 rounded-md mt-4 border border-gray-200">
            <p className="text-gray-500 text-lg font-semibold select-none">
              No results found
            </p>
          </div>
        )}

        <Pagination
          table={table}
          totalRows={totalRows}
          paginating={paginating}
          hidePagination={hidePagination}
        />
      </TableStyle>

      {errorMessage && <ErrorAlert errorMessage={errorMessage} />}
    </>
  );
}

function ErrorAlert({ errorMessage }: { errorMessage: string }) {
  return (
    <div className="max-w-md mx-auto my-4 rounded-md border border-red-300 bg-red-50 p-4 shadow-sm">
      <p className="text-red-700 font-semibold text-center">{errorMessage}</p>
    </div>
  );
}

export function SkeletonLoader({ columnsLength }: { columnsLength: number }) {
  return (
    <tbody className="bg-white">
      <tr className="border-b even:bg-gray-50 hover:bg-gray-100 transition-colors duration-150">
        {Array.from({ length: columnsLength }).map((_, index) => (
          <td
            key={index}
            className="whitespace-nowrap px-4 py-3 text-start text-sm font-medium"
          >
            <div className="animate-pulse w-full">
              <div className="h-4 bg-gray-300 rounded-md max-w-[70%] mx-auto" />
            </div>
          </td>
        ))}
      </tr>
    </tbody>
  );
}
