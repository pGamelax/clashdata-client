"use client";

import React, { useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Bomb,
  ChevronLeft,
  ChevronRight,
  Star,
  Swords,
  Target,
  Trophy,
} from "lucide-react";
import { columns } from "./columns";

export function WarHistorySection({ rawData }: { rawData: any }) {
  const formatWarData = (items: any[]) => {
    return items.map((item: any) => {
      const myClanStars = item.war_data.clan.stars;
      const opponentStars = item.war_data.opponent.stars;
      const dateRaw = item.war_data.endTime;

      const playerStars =
        item.attacks?.reduce((acc: number, att: any) => acc + att.stars, 0) ||
        0;
      const playerDestruction = item.attacks?.[0]?.destructionPercentage || 0;

      return {
        id: item.war_data.endTime + item.war_data.opponent.tag,
        clanName: item.war_data.opponent.name,
        type: item.war_data.type,
        result: myClanStars > opponentStars ? "Vitória" : "Derrota",
        stars: playerStars,
        destruction: playerDestruction.toFixed(0),
        date: `${dateRaw.substring(6, 8)}/${dateRaw.substring(4, 6)}/${dateRaw.substring(0, 4)}`,
        // Guardamos os ataques originais para o detalhe
        rawAttacks: item.attacks || [],
      };
    });
  };

  const allData = formatWarData(rawData.items);
  const normalWars = allData.filter((w) => w.type === "random");
  const specialWars = allData.filter((w) => w.type !== "random");

  return (
    <div className="w-full space-y-6">
      <Tabs defaultValue="normal" className="w-full">
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2">
            <Swords className="text-primary" size={20} />
            <h2 className="text-xl font-bold tracking-tight">
              Histórico de Batalhas
            </h2>
          </div>
          <TabsList className="bg-slate-100 dark:bg-zinc-800 rounded-xl p-1">
            <TabsTrigger
              value="normal"
              className="rounded-lg px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-950"
            >
              Normais
            </TabsTrigger>
            <TabsTrigger
              value="special"
              className="rounded-lg px-4 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-950"
            >
              Ligas / Especiais
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="normal">
          <DataTable columns={columns} data={normalWars} />
        </TabsContent>
        <TabsContent value="special">
          <DataTable columns={columns} data={specialWars} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function DataTable({ columns, data }: any) {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 5 },
    },
  });

  const toggleRow = (id: string) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-4">
      <div className="rounded-[2rem] border border-border/50 bg-white dark:bg-zinc-900/50 overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-slate-50 dark:bg-zinc-800/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="hover:bg-transparent border-border/40"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-[10px] font-black uppercase tracking-widest text-muted-foreground h-12"
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow
                    className="cursor-pointer border-border/40 hover:bg-slate-50/50 dark:hover:bg-zinc-800/30 transition-colors"
                    onClick={() => toggleRow(row.id)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className="py-4 text-sm font-medium"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>

                  {/* LINHA DE DETALHES (ATAQUES) */}
                  {expandedRows[row.id] && (
                    <TableRow className="bg-slate-50/30 dark:bg-zinc-950/30 border-none">
                      <TableCell
                        colSpan={columns.length}
                        className="p-4 animate-in fade-in slide-in-from-top-2 duration-200"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {row.original.rawAttacks.length > 0 ? (
                            row.original.rawAttacks.map(
                              (att: any, idx: number) => (
                                <div
                                  key={idx}
                                  className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-border/50 shadow-sm"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                      {idx + 1}º
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-1 bg-amber-500/10 px-3 py-1 rounded-full">
                                    <span className="text-amber-600 font-black text-sm">
                                      {att.stars}
                                    </span>
                                    <Star
                                      size={14}
                                      className="fill-amber-600 text-amber-600"
                                    />
                                  </div>
                                  <div className="flex items-center gap-1 bg-green-500/10 px-3 py-1 rounded-full">
                                    <span className="text-green-600 font-black text-sm">
                                      {att.destructionPercentage}
                                    </span>
                                    <Bomb
                                      size={14}
                                      className="fill-green-600 text-green-600"
                                    />
                                  </div>
                                </div>
                              ),
                            )
                          ) : (
                            <p className="text-xs text-muted-foreground italic px-2">
                              Nenhum ataque realizado nesta guerra.
                            </p>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-muted-foreground"
                >
                  Nenhuma guerra registrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINAÇÃO */}
      <div className="flex items-center justify-between px-2">
        <p className="text-xs text-muted-foreground">
          Página <b>{table.getState().pagination.pageIndex + 1}</b> de{" "}
          {table.getPageCount()}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 rounded-lg"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 w-8 p-0 rounded-lg"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
}
