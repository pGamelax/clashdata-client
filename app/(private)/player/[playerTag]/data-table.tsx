"use client";

import React, { useState } from "react";
import {
  ColumnDef,
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
import { Bomb, ChevronLeft, ChevronRight, Star, Swords } from "lucide-react";
import { columns, ClanWar, WarAttack } from "./columns";

// --- INTERFACES DA API ---
interface RawWarItem {
  war_data: {
    endTime: string;
    type: string;
    clan: { stars: number };
    opponent: { name: string; tag: string; stars: number };
  };
  attacks?: WarAttack[];
}

interface RawData {
  items: RawWarItem[];
}

interface WarHistorySectionProps {
  rawData: RawData;
}

export function WarHistorySection({ rawData }: WarHistorySectionProps) {
  const formatWarData = (items: RawWarItem[]): ClanWar[] => {
    return items.map((item) => {
      const myClanStars = item.war_data.clan.stars;
      const opponentStars = item.war_data.opponent.stars;
      const dateRaw = item.war_data.endTime;

      const playerStars =
        item.attacks?.reduce(
          (acc: number, att: WarAttack) => acc + att.stars,
          0,
        ) || 0;
      const playerDestruction = item.attacks?.[0]?.destructionPercentage || 0;

      return {
        id: item.war_data.endTime + item.war_data.opponent.tag,
        clanName: item.war_data.opponent.name,
        opponentName: item.war_data.opponent.name,
        result: myClanStars > opponentStars ? "Vitória" : "Derrota",
        stars: playerStars,
        destruction: Number(playerDestruction.toFixed(0)),
        date: `${dateRaw.substring(6, 8)}/${dateRaw.substring(4, 6)}/${dateRaw.substring(0, 4)}`,
        rawAttacks: item.attacks || [],
        type: item.war_data.type,
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
            <TabsTrigger value="normal" className="rounded-lg px-4 py-2">
              Normais
            </TabsTrigger>
            <TabsTrigger value="special" className="rounded-lg px-4 py-2">
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

// --- DATA TABLE TOTALMENTE TIPADA ---
interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
}

function DataTable<TData extends ClanWar>({
  columns,
  data,
}: DataTableProps<TData>) {
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
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
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

                  {/* EXPANSÃO DE LINHA */}
                  {expandedRows[row.id] && (
                    <TableRow className="bg-slate-50/30 dark:bg-zinc-950/30 border-none">
                      <TableCell
                        colSpan={columns.length}
                        className="p-4 animate-in fade-in slide-in-from-top-2"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {row.original.rawAttacks.length > 0 ? (
                            row.original.rawAttacks.map((att, idx) => (
                              <div
                                key={idx}
                                className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-border/50 shadow-sm"
                              >
                                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                                  {idx + 1}º
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
                                    {att.destructionPercentage}%
                                  </span>
                                  <Bomb
                                    size={14}
                                    className="fill-green-600 text-green-600"
                                  />
                                </div>
                              </div>
                            ))
                          ) : (
                            <p className="text-xs text-muted-foreground italic px-2">
                              Nenhum ataque registrado.
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
                  className="h-24 text-center"
                >
                  Nenhuma guerra registrada.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between px-2">
        <p className="text-xs text-muted-foreground">
          Página <b>{table.getState().pagination.pageIndex + 1}</b> de{" "}
          {table.getPageCount()}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
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
