"use client";

import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Percent, Search, Star, X } from "lucide-react";
import { DateRange } from "react-day-picker";
import { isWithinInterval, parseISO } from "date-fns";
import { DatePickerWithRange } from "@/components/data-picker";
// IMPORTANTE: Importando ProcessedPlayer aqui
import { PlayerStats, WarAction, ProcessedPlayer } from "./types";

interface DataTableProps {
  columns: ColumnDef<ProcessedPlayer>[];
  data: PlayerStats[];
}

export function DataTable({ columns, data }: DataTableProps) {
  const [globalFilter, setGlobalFilter] = useState("");
  const [date, setDate] = useState<DateRange | undefined>();
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const { dynamicData, warCount } = useMemo(() => {
    const K = 8;
    const GLOBAL_AVG = 2.0;
    const uniqueWarDates = new Set<string>();

    if (!Array.isArray(data)) return { dynamicData: [], warCount: 0 };

    const processed: ProcessedPlayer[] = data
      .map((player) => {
        const attacks = player.allAttacks.filter((att: WarAction) => {
          const attackDate = parseISO(att.date);
          if (!date?.from || !date?.to) {
            uniqueWarDates.add(att.date);
            return true;
          }
          const isInRange = isWithinInterval(attackDate, {
            start: date.from,
            end: date.to,
          });
          if (isInRange) uniqueWarDates.add(att.date);
          return isInRange;
        });

        const defenses = player.allDefenses.filter((def: WarAction) => {
          if (!date?.from || !date?.to) return true;
          return isWithinInterval(parseISO(def.date), {
            start: date.from,
            end: date.to,
          });
        });

        const attackCount = attacks.length;
        const totalStars = attacks.reduce((acc, cur) => acc + cur.stars, 0);
        const totalDestr = attacks.reduce(
          (acc, cur) => acc + cur.destruction,
          0,
        );

        const performanceScore =
          (K * GLOBAL_AVG + totalStars) / (K + attackCount);

        const defenseCount = defenses.length;
        const totalDefStars = defenses.reduce((acc, cur) => acc + cur.stars, 0);
        const totalDefDestr = defenses.reduce(
          (acc, cur) => acc + cur.destruction,
          0,
        );

        return {
          ...player,
          attackCount,
          performanceScore,
          avgStars:
            attackCount > 0 ? (totalStars / attackCount).toFixed(2) : "0.00",
          avgDestruction:
            attackCount > 0 ? (totalDestr / attackCount).toFixed(0) : "0",
          avgDefenseStars:
            defenseCount > 0
              ? (totalDefStars / defenseCount).toFixed(2)
              : "0.00",
          avgDefenseDestruction:
            defenseCount > 0 ? (totalDefDestr / defenseCount).toFixed(0) : "0",
          displayAttacks: attacks,
        };
      })
      .filter((p) => (date?.from && date?.to ? p.attackCount > 0 : true))
      .sort((a, b) => b.performanceScore - a.performanceScore);

    return { dynamicData: processed, warCount: uniqueWarDates.size };
  }, [data, date]);

  const table = useReactTable({
    data: dynamicData,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="space-y-4 w-full max-w-[100vw] overflow-hidden px-1 sm:px-0">
      <div className="flex flex-col gap-4 px-2 md:flex-row md:justify-between md:items-center">
        <div>
          <p className="text-sm text-muted-foreground mt-1">
            Análise baseada em{" "}
            <span className="font-semibold text-primary">{warCount}</span>{" "}
            guerras
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 items-center">
          {/* Input de Busca */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar jogador..."
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              // h-10, rounded-xl e cores de borda idênticas ao botão
              className="pl-9 h-10 rounded-xl border-slate-200 dark:border-zinc-800 bg-background focus-visible:ring-1"
            />
          </div>

          {/* Date Picker */}
          <div className="w-full sm:w-72 items-center gap-2">
            <DatePickerWithRange date={date} setDate={setDate} />
          </div>
        </div>
      </div>

      <div className="rounded-xl sm:rounded-[2rem] border bg-white dark:bg-zinc-900/50 shadow-sm overflow-x-auto">
        <div className="min-w-150 md:min-w-full">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-zinc-800/50">
              {table.getHeaderGroups().map((hg) => (
                <TableRow key={hg.id} className="border-none">
                  {hg.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className=" uppercase py-4 first:pl-4 last:pr-4"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    className="cursor-pointer hover:bg-slate-50/50 dark:hover:bg-zinc-800/20 transition-colors"
                    onClick={() =>
                      setExpandedRows((v) => ({ ...v, [row.id]: !v[row.id] }))
                    }
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="py-2 first:pl-4 last:pr-4"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  {expandedRows[row.id] && (
                    <TableRow className="bg-slate-50/30 dark:bg-zinc-950/30 border-none">
                      <TableCell
                        colSpan={columns.length}
                        className="p-2 sm:p-4"
                      >
                        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                          {row.original.displayAttacks.map((att, i) => (
                            <div
                              key={i}
                              className="p-3 rounded-xl bg-white dark:bg-zinc-900 border border-border/50 shadow-sm"
                            >
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold uppercase text-muted-foreground">
                                  Ataque {i + 1}
                                </span>

                                <div className="flex flex-row items-center gap-2">
                                  <div className="flex items-center gap-1 bg-green-500/10 px-2 py-0.5 rounded-full text-green-600">
                                    <span className="text-sm font-bold">
                                      {att.destruction}
                                    </span>
                                    <Percent size={10} />
                                  </div>
                                  <div className="flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-full text-amber-600">
                                    <span className="text-sm font-bold">
                                      {att.stars}
                                    </span>
                                    <Star size={10} className="fill-current" />
                                  </div>
                                </div>
                              </div>
                              <div className="font-bold text-sm truncate flex flex-row justify-between">
                                <span>{att.opponent}</span>
                                <div className="text-sm text-muted-foreground flex justify-between">
                                  <span>
                                    {new Date(
                                      parseISO(att.date),
                                    ).toLocaleDateString("pt-BR")}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="flex gap-2 justify-between flex-row w-full">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}
