"use client";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: "Jogador",
    cell: ({ row }) => <span className="font-bold text-zinc-200">{row.original.name}</span>,
  },
  {
    accessorKey: "gain",
    header: "Ganho",
    cell: ({ row }) => (
      <span className="text-emerald-500 font-mono">
        +{row.original.gain}<sup className="text-[10px] ml-0.5">{row.original.attackCount}</sup>
      </span>
    ),
  },
  {
    accessorKey: "loss",
    header: "Perda",
    cell: ({ row }) => (
      <span className="text-rose-500 font-mono">
        {row.original.loss}<sup className="text-[10px] ml-0.5">{row.original.defenseCount}</sup>
      </span>
    ),
  },
  {
    accessorKey: "final",
    header: "Troféus",
    cell: ({ row }) => <span className="font-black text-amber-500 italic">{row.original.final}</span>,
  },
];