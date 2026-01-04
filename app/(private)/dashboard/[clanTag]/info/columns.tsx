"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Star, Shield, Trophy, Swords } from "lucide-react";

export const columns: ColumnDef<any>[] = [
  {
    id: "rank",
    header: "#",
    cell: ({ row }) => {
      const rank = row.index + 1;
      if (rank === 1) return <Trophy size={18} className="text-amber-500" />;
      if (rank === 2) return <Trophy size={18} className="text-slate-400" />;
      if (rank === 3) return <Trophy size={18} className="text-amber-700" />;
      return (
        <span className="text-xs font-mono text-muted-foreground">{rank}</span>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Jogador",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-semibold text-sm tracking-tight">
          {row.original.name}
        </span>
        <span className="text-xs text-muted-foreground font-mono">
          {row.original.tag}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "performanceScore",
    header: "Eficiência",
    cell: ({ row }) => {
      const score = row.original.performanceScore;
      const progress = (score / 3) * 100;
      return (
        <div className="flex flex-col w-32 gap-1">
          <div className="flex justify-between items-center">
            <span className="text-xs font-semibold text-primary">
              {score.toFixed(2)} pts
            </span>
            <span className="text-xs text-muted-foreground uppercase">
              {row.original.attackCount} atq
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all ${progress > 80 ? "bg-emerald-500" : "bg-primary"}`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      );
    },
  },
  {
    id: "avgStars",
    header: "Média Ataque",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <div className="flex items-center gap-1 text-sm font-semibold">
          <Star size={12} className="fill-amber-400 text-amber-400" />
          {row.original.avgStars}
        </div>
        <span className="text-muted-foreground">
          {row.original.avgDestruction}%
        </span>
      </div>
    ),
  },
  {
    id: "avgDefense",
    header: "Média Defesa",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <div className="flex items-center gap-1 text-sm font-semibold">
          <Shield size={12} className="text-blue-500 fill-blue-500" />
          {row.original.avgDefenseStars}
        </div>
        <span className="text-muted-foreground">
          {row.original.avgDefenseDestruction}%
        </span>
      </div>
    ),
  },
];
