import { cn } from "@/utils/cn";
import { flexRender } from "@tanstack/react-table";

export default function TableBody({ table }: { table: any }) {
  return (
    <tbody className="bg-white">
      {table.getRowModel().rows.map((row: any) => (
        <tr
          key={row.id}
          className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200 ease-in-out cursor-pointer"
        >
          {row.getVisibleCells().map((cell: any) => {
            const cellValue = cell.getValue();
            return (
              <td
                key={cell.id}
                className={cn(
                  "whitespace-nowrap px-5 py-4 text-start text-sm font-normal text-gray-800 border-r last:border-r-0"
                )}
              >
                {cellValue !== null ? (
                  flexRender(cell.column.columnDef.cell, cell.getContext())
                ) : (
                  <span className="text-gray-400 italic select-none">N/A</span>
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}
