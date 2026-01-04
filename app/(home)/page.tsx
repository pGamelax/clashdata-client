"use client";

import {
  BarChart3,
  Users,
  ChevronRight,
  ArrowRight,
  Trophy,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-zinc-950 text-slate-900 dark:text-slate-100">
      <main className="grow">
        {/* --- HERO SECTION --- */}
        <section className="py-20 lg:py-32 px-6">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
              <Target size={14} /> Performance de Elite em Tempo Real
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tighter leading-tight text-slate-900 dark:text-white">
              Domine as Guerras com <br />
              <span className="text-primary italic">Dados Precisos.</span>
            </h1>

            <p className="text-lg lg:text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
              Acompanhe a destruição média, estrelas e atividade de cada
              jogador. Transforme seu clã em uma máquina de vitórias com
              analytics de alto nível.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/sign-up" className="hover:cursor-pointer">
                <Button
                  size="lg"
                  className="rounded-2xl h-14 px-8 text-lg w-full sm:w-auto hover:cursor-pointer hover:bg-primary/50 bg-primary  "
                >
                  COMEÇAR AGORA <ChevronRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* --- FEATURES GRID --- */}
        <section className="py-20 bg-white dark:bg-zinc-900/30 border-y border-border/40">
          <div className="max-w-7xl mx-auto px-6 text-center space-y-12">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">
                Recursos para Gestão de Elite
              </h2>
              <p className="text-muted-foreground font-medium">
                Tudo o que você precisa para liderar o Hall da Fama.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              {/* Feature 1 */}
              <div className="bg-[#f8fafc] dark:bg-zinc-900 rounded-3xl p-8 border border-border/50 shadow-sm space-y-4 transition-all hover:shadow-xl">
                <div className="bg-primary/10 text-primary p-3 rounded-2xl w-fit">
                  <BarChart3 size={24} />
                </div>
                <h3 className="text-xl font-bold">Analytics de Ataques</h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  Cálculo automático de porcentagem de destruição e média de
                  estrelas por guerra.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-[#f8fafc] dark:bg-zinc-900 rounded-3xl p-8 border border-border/50 shadow-sm space-y-4 transition-all hover:shadow-xl">
                <div className="bg-amber-500/10 text-amber-500 p-3 rounded-2xl w-fit">
                  <Trophy size={24} />
                </div>
                <h3 className="text-xl font-bold">Hall da Fama</h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  Ranking dinâmico dos melhores jogadores baseado em performance
                  histórica.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-[#f8fafc] dark:bg-zinc-900 rounded-3xl p-8 border border-border/50 shadow-sm space-y-4 transition-all hover:shadow-xl">
                <div className="bg-blue-500/10 text-blue-500 p-3 rounded-2xl w-fit">
                  <Users size={24} />
                </div>
                <h3 className="text-xl font-bold">Gestão de Clãs</h3>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                  Importe múltiplos clãs e gerencie seus membros.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-20 lg:py-32">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white dark:bg-zinc-900 rounded-[3rem] p-10 lg:p-16 text-center space-y-8 shadow-2xl">
              <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
                Pronto para subir de liga?
              </h2>
              <p className="text-muted-foreground font-medium text-lg">
                Junte-se a centenas de líderes que já automatizaram{" "}
                <br className="hidden md:block" /> sua análise de dados de
                guerra.
              </p>
              <Link href="/" className="hover:cursor-pointer">
                <Button
                  size="lg"
                  className="rounded-2xl h-14 px-8 text-lg w-full sm:w-auto hover:cursor-pointer hover:bg-primary/50 bg-primary  "
                >
                  Veja quem participa <ChevronRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
