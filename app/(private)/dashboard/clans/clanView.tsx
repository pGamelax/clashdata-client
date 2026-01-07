"use client";
import { ChevronRight, LayoutGrid } from "lucide-react";
import { useRouter } from "next/navigation";

export function ClansView({ clans }: { clans: any[] }) {
  const isEmpty = clans.length === 0;
  const router = useRouter();

  const handleSetActiveClan = (tag: string) => {
    try {
      router.push(`/dashboard/${tag.replace("#", "")}/info`);
    } catch (error) {
      console.error("Erro ao definir clã ativo:", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#09090b] p-4 lg:p-8 text-slate-900 dark:text-zinc-100">
      <div className="container mx-auto space-y-8">
        <header className="flex flex-row items-center justify-between px-2">
          <div className="space-y-1">
            <h1 className="text-2xl font-extrabold tracking-tight lg:text-4xl">
              Meus clans
            </h1>
          </div>
        </header>

        {isEmpty ? (
          <div className="flex flex-col items-center justify-center min-h-100 rounded-3xl border-2 border-dashed border-slate-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/20 p-12 text-center animate-in fade-in zoom-in duration-500">
            <div className="p-4 rounded-full bg-slate-100 dark:bg-zinc-800 mb-6">
              <LayoutGrid size={48} className="text-muted-foreground/40" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              Nenhum clã encontrado
            </h2>
            <p className="text-muted-foreground max-w-sm mt-2 mb-8">
              Você ainda não vinculou nenhum clã à sua conta do ClashData para
              monitorar estatísticas.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clans.map((clan) => (
              <div
                key={clan.tag}
                onClick={() => handleSetActiveClan(clan.tag)}
                className="group relative flex flex-col rounded-3xl border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:dark:bg-zinc-900 transition-all hover:shadow-xl hover:-translate-y-1 overflow-hidden p-6 space-y-4 "
              >
                <div className="flex items-center gap-4">
                  <div className="space-y-2">
                    <h2 className="text-xl font-bold truncate group-hover:text-primary transition-colors">
                      {clan.name}
                    </h2>
                    <p className="text-xs font-mono text-muted-foreground">
                      {clan.tag}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end text-xs font-bold text-primary transition-all">
                  DASHBOARD <ChevronRight size={14} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
