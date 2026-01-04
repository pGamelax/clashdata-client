import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "date",
    header: "Data",
    cell: ({ row }) => (
      <span className="font-mono text-xs">{row.original.date}</span>
    ),
  },
  {
    accessorKey: "opponentName",
    header: "Clan",
    cell: ({ row }) => (
      <span className="font-bold">{row.original.clanName}</span>
    ),
  },
  {
    accessorKey: "result",
    header: "Resultado",
    cell: ({ row }) => {
      const isWin = row.original.result === "Vitória";
      return (
        <Badge
          className={
            isWin
              ? "bg-emerald-500/10 text-emerald-600 border-none"
              : "bg-red-500/10 text-red-600 border-none"
          }
        >
          {row.original.result}
        </Badge>
      );
    },
  },
  {
    accessorKey: "stars",
    header: "Estrelas",
    cell: ({ row }) => (
      <div className="flex items-center gap-1">
        <span className="font-bold">{row.original.stars}</span>
        <Star size={12} className="fill-amber-400 text-amber-400" />
      </div>
    ),
  },
  {
    accessorKey: "destruction",
    header: "Destruição",
    cell: ({ row }) => (
      <span className="font-medium">{row.original.destruction}%</span>
    ),
  },
];
