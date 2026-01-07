"use client";
import { ChartSpline, Trophy, Sword, Swords, TrendingUp } from "lucide-react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { InfoViewProps } from "./types";

export function InfoView({
  clanData,
  data,

  clanTag,
}: InfoViewProps) {
  const stats = [
    {
      label: "Vitórias",
      value: clanData.warWins,
      icon: Trophy,
      color: "text-amber-500",
    },
    {
      label: "Derrotas",
      value: clanData.warLosses,
      icon: Sword,
      color: "text-rose-500",
    },
    {
      label: "Total de Guerras",
      value: clanData.totalWars,
      icon: Swords,
      color: "text-indigo-500",
    },
    {
      label: "Taxa de Vitória",
      value:
        clanData.totalWars > 0
          ? `${((clanData.warWins / clanData.totalWars) * 100).toFixed(2)}%`
          : "0%",
      icon: TrendingUp,
      color: "text-emerald-500",
    },
  ];

  return (
    <div className="min-h-screen  bg-[#f8fafc] dark:bg-zinc-950 p-4 lg:p-8 text-slate-900 dark:text-slate-100">
      <div className=" container mx-auto space-y-8">
        <header className="flex flex-col gap-1 px-1">
          <div className="flex items-end gap-3">
            <h1 className="text-2xl font-extrabold tracking-tight lg:text-4xl">
              {clanData.name}
            </h1>
            <p className="text-sm text-muted-foreground bg-white dark:bg-zinc-800 rounded-2xl px-2 border border-border/40">
              #{clanTag.replace("%23", "")}
            </p>
          </div>
          <p className="text-muted-foreground font-medium max-w-2xl">
            {clanData.description}
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="group relative flex flex-col bg-white dark:bg-zinc-900/50 rounded-3xl border border-border/50 shadow-sm p-6 hover:shadow-lg transition-all"
              >
                <div
                  className={`p-2 w-fit rounded-lg bg-white dark:bg-zinc-800 shadow-sm ${stat.color}`}
                >
                  <Icon size={20} />
                </div>
                <div className="mt-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold tracking-tight mt-1">
                    {stat.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 px-1">
            <div className="bg-primary/10 text-primary p-2 rounded-xl">
              <ChartSpline size={20} />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              Performance Detalhada
            </h2>
          </div>

          <div className="relative flex flex-col bg-white dark:bg-zinc-900/50 rounded-3xl border border-border/50 shadow-sm p-6">
            <DataTable columns={columns} data={data.players} />
          </div>
        </div>
      </div>
    </div>
  );
}
