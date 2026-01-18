"use client";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";

export function DataTable({ columns, data }: any) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <div className="w-full overflow-hidden">
      <table className="w-full text-sm text-left border-collapse">
        <thead className="bg-slate-50 dark:bg-zinc-800/50 text-slate-500 dark:text-zinc-400 uppercase text-[10px] tracking-widest font-bold">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="px-6 py-4 border-b border-border/40">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-border/40">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="group hover:bg-slate-50 dark:hover:bg-zinc-800/30 transition-all">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4 text-slate-700 dark:text-zinc-300">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}