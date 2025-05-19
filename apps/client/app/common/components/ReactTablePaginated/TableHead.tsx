import { flexRender } from "@tanstack/react-table";

export default function TableHead({ table }: { table: any }) {
  return (
    <thead className="bg-gray-100  top-0 z-10">
      {table.getHeaderGroups().map((headerGroup: any) => (
        <tr key={headerGroup.id} className="border-b border-gray-300">
          {headerGroup.headers.map((header: any) => (
            <th
              key={header.id}
              className="capitalize tracking-wide whitespace-nowrap px-5 py-3 text-left text-xs font-semibold text-gray-700 select-none"
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}
