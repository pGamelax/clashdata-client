"use client";
import { useState, useMemo, useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import {
  ClipboardCheck,
  Calendar,
  ChartSpline,
  Zap,
  Trophy,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function PushView({ rawData }: { rawData: any }) {
  const seasonDates = useMemo(() => {
    const dates = new Set<string>();
    rawData.items.forEach((player: any) => {
      player.logs.forEach((log: any) => {
        dates.add(new Date(log.timestamp).toISOString().split("T")[0]);
      });
    });
    return Array.from(dates).sort();
  }, [rawData]);

  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    if (seasonDates.length > 0)
      setSelectedDate(seasonDates[seasonDates.length - 1]);
  }, [seasonDates]);

  const toSup = (n: number) => {
    const sups: any = {
      "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴",
      "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹",
    };
    return n.toString().split("").map((d) => sups[d]).join("");
  };

  const reportData = useMemo(() => {
    if (!selectedDate) return [];
    return rawData.items
      .map((player: any) => {
        const dailyLogs = player.logs.filter(
          (log: any) =>
            new Date(log.timestamp).toISOString().split("T")[0] === selectedDate
        );
        const attacks = dailyLogs.filter((l: any) => l.type === "attack");
        const defenses = dailyLogs.filter((l: any) => l.type === "defense");
        return {
          name: player.name,
          gain: attacks.reduce((acc: number, curr: any) => acc + curr.diff, 0),
          attackCount: attacks.length,
          loss: defenses.reduce((acc: number, curr: any) => acc + curr.diff, 0),
          defenseCount: defenses.length,
          final: player.trophies,
        };
      })
      .sort((a: any, b: any) => b.final - a.final);
  }, [selectedDate, rawData]);

  const copyToClipboard = () => {
    // Formata a data para o cabeçalho do clipboard
    const displayDate = new Date(selectedDate + "T12:00:00").toLocaleDateString("pt-BR");
    const text = reportData
      .map(
        (r) =>
          `+${r.gain}${toSup(r.attackCount)} ${r.loss}${toSup(
            r.defenseCount
          )}  ${r.final}  ${r.name}`
      )
      .join("\n");
    navigator.clipboard.writeText(`*Legend League Attacks - ${displayDate}*\n${text}`);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-zinc-950 p-4 lg:p-8 text-slate-900 dark:text-slate-100">
      <div className="container mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 px-1">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-extrabold tracking-tight lg:text-4xl uppercase italic">
                <span className="text-primary">PUSH</span> Animals
              </h1>
              <span className="text-xs font-bold text-muted-foreground bg-white dark:bg-zinc-900 rounded-2xl px-3 py-1 border border-border/40 shadow-sm">
                TEMPORADA {rawData.items[0]?.seasonId}
              </span>
            </div>
            <p className="text-muted-foreground font-medium">
              Acompanhamento diário de performance do clã.
            </p>
          </div>
          
          <button 
            onClick={copyToClipboard}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-2xl text-sm font-bold transition-all shadow-md active:scale-95"
          >
            <ClipboardCheck size={18} /> Copiar Relatório
          </button>
        </header>

        <div className="space-y-3">
          <div className="flex items-center gap-2 px-1 text-muted-foreground">
            <Calendar size={16} />
            <h2 className="text-sm font-bold uppercase tracking-widest">
              Linha do Tempo
            </h2>
          </div>

          <Tabs
            value={selectedDate}
            onValueChange={setSelectedDate}
            className="w-full"
          >
            <ScrollArea className="w-full whitespace-nowrap rounded-3xl border border-border/50 bg-white dark:bg-zinc-900/50 p-2 shadow-sm">
              <TabsList className="bg-transparent h-11 inline-flex w-max gap-2">
                {seasonDates.map((date) => {
                  // Converte "2026-01-14" em "14/01"
                  const dateObj = new Date(date + "T12:00:00");
                  const formattedDate = dateObj.toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                  });

                  return (
                    <TabsTrigger
                      key={date}
                      value={date}
                      className="data-[state=active]:bg-slate-100 dark:data-[state=active]:bg-zinc-800 data-[state=active]:text-indigo-600 dark:data-[state=active]:text-indigo-400 px-5 rounded-2xl font-bold text-xs transition-all border border-transparent data-[state=active]:border-border/60"
                    >
                      {formattedDate}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </Tabs>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 px-1">
            <div className="bg-indigo-500/10 text-indigo-500 p-2 rounded-xl">
              <ChartSpline size={20} />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Performance Detalhada</h2>
          </div>

          <div className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-border/50 shadow-sm overflow-hidden transition-all hover:shadow-md">
            <DataTable columns={columns} data={reportData} />
          </div>
        </div>
      </div>
    </div>
  );
}