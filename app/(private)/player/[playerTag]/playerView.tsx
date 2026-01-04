"use client";

import {
  Award,
  Crown,
  Flame,
  Hammer,
  Shield,
  Star,
  Sword,
  Trophy,
  Zap,
  Swords,
} from "lucide-react";
import { WarHistorySection } from "./data-table";

export function PlayerView({
  userData,
  warHistory,
}: {
  userData: any;
  warHistory: any;
}) {
  const quickStats = [
    {
      label: "Troféus Atuais",
      value: userData.trophies,
      icon: Trophy,
      color: "text-amber-500",
    },
    {
      label: "Recorde Histórico",
      value: userData.bestTrophies,
      icon: Star,
      color: "text-blue-500",
    },
    {
      label: "Estrelas de Guerra",
      value: userData.warStars,
      icon: Sword,
      color: "text-red-500",
    },
    {
      label: "Nível de EXP",
      value: userData.expLevel,
      icon: Flame,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] dark:bg-zinc-950 text-slate-900 dark:text-slate-100 font-sans">
      <main className="grow p-4 lg:p-8">
        <div className="max-w-[1400px] mx-auto space-y-8">
          {/* HEADER DO PERFIL (Mantido o seu código original) */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-zinc-900/50 p-8 rounded-[2.5rem] border border-border/50 shadow-sm">
            <div className="flex items-center gap-6">
              <div className="relative">
                <img
                  src={userData.leagueTier?.iconUrls?.large}
                  alt="League"
                  className="w-20 h-20 lg:w-24 lg:h-24 object-contain"
                />
                <span className="absolute -bottom-2 -right-2 bg-slate-900 dark:bg-white text-white dark:text-zinc-950 text-xs font-black px-2 py-1 rounded-lg">
                  TH {userData.townHallLevel}
                </span>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight">
                  {userData.name}
                </h1>
                <p className="text-muted-foreground font-mono text-sm">
                  {userData.tag}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <img
                    src={userData.clan?.badgeUrls?.small}
                    className="w-5 h-5"
                    alt="Clan"
                  />
                  <span className="font-bold text-sm text-primary">
                    {userData.clan?.name}
                  </span>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest px-2 py-0.5 bg-slate-100 dark:bg-zinc-800 rounded-md">
                    {userData.role}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {userData.labels.map((label: any) => (
                <div
                  key={label.id}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-zinc-800 rounded-2xl border border-border/50 shadow-sm"
                >
                  <img
                    src={label.iconUrls.small}
                    className="w-4 h-4"
                    alt={label.name}
                  />
                  <span className="text-[10px] font-bold uppercase tracking-tight">
                    {label.name}
                  </span>
                </div>
              ))}
            </div>
          </header>

          {/* QUICK STATS GRID */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStats.map((stat, i) => (
              <div
                key={i}
                className="bg-white dark:bg-zinc-900/50 p-6 rounded-3xl border border-border/50 shadow-sm"
              >
                <stat.icon size={20} className={stat.color} />
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mt-4">
                  {stat.label}
                </p>
                <p className="text-2xl font-bold tracking-tighter mt-1">
                  {stat.value.toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {/* NOVA SEÇÃO: ESTATÍSTICAS DE GUERRA (DATA TABLE) */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 px-1">
              <div className="bg-red-500/10 text-red-600 p-2 rounded-xl">
                <Swords size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Desempenho em Guerras
                </h2>
                <p className="text-xs text-muted-foreground">
                  Análise detalhada de ataques e destruição por período
                </p>
              </div>
            </div>

            {/* O Componente da Tabela que criamos anteriormente */}
            <div className="bg-white dark:bg-zinc-900/50 p-2 rounded-[2rem] border border-border/50 shadow-sm">
              <WarHistorySection rawData={warHistory} />
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* HERÓIS E EQUIPAMENTOS */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 text-primary p-2 rounded-xl">
                  <Crown size={20} />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Exército e Heróis
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userData.heroes
                  .filter((h: any) => h.village === "home")
                  .map((hero: any, i: number) => (
                    <div
                      key={i}
                      className="bg-white dark:bg-zinc-900/50 rounded-3xl border border-border/50 p-5 space-y-4"
                    >
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-lg">{hero.name}</h3>
                        <span className="bg-primary text-white text-[10px] font-black px-2 py-1 rounded-lg">
                          LVL {hero.level}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {hero.equipment?.map((eq: any, j: number) => (
                          <div
                            key={j}
                            className="flex flex-col p-3 bg-slate-50 dark:bg-zinc-800 rounded-2xl border border-border/40"
                          >
                            <span className="text-[9px] font-black text-muted-foreground uppercase tracking-tighter">
                              Equipamento
                            </span>
                            <span className="text-[11px] font-bold truncate mt-1">
                              {eq.name}
                            </span>
                            <span className="text-[10px] text-primary font-bold mt-1">
                              Nível {eq.level}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* STATUS DAS VILAS */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500/10 text-amber-600 p-2 rounded-xl">
                  <Shield size={20} />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">
                  Resumo de Vilas
                </h2>
              </div>

              <div className="space-y-4">
                <div className="bg-white dark:bg-zinc-900/50 p-6 rounded-3xl border border-border/50 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                      Vila Principal
                    </span>
                    <Hammer size={16} className="text-primary" />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Centro de Vila
                      </span>
                      <span className="font-bold">
                        Nível {userData.townHallLevel}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Contribuição Capital
                      </span>
                      <span className="font-bold">
                        {userData.clanCapitalContributions.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-zinc-900/50 p-6 rounded-3xl border border-border/50 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                      Base do Construtor
                    </span>
                    <Zap size={16} className="text-amber-500" />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Casa do Construtor
                      </span>
                      <span className="font-bold">
                        Nível {userData.builderHallLevel}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Troféus</span>
                      <span className="font-bold text-amber-500">
                        {userData.builderBaseTrophies}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CONQUISTAS */}
          <section className="space-y-4">
            <div className="flex items-center gap-3 px-1">
              <div className="bg-purple-500/10 text-purple-600 p-2 rounded-xl">
                <Award size={20} />
              </div>
              <h2 className="text-2xl font-bold tracking-tight">
                Principais Conquistas
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userData.achievements.slice(0, 9).map((ach: any, i: number) => (
                <div
                  key={i}
                  className="bg-white dark:bg-zinc-900/50 p-5 rounded-3xl border border-border/50 flex flex-col justify-between hover:bg-slate-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  <div>
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-sm">{ach.name}</h4>
                      <div className="flex gap-0.5">
                        {[...Array(3)].map((_, starIdx) => (
                          <Star
                            key={starIdx}
                            size={12}
                            className={
                              starIdx < ach.stars
                                ? "fill-amber-500 text-amber-500"
                                : "text-slate-200 dark:text-zinc-700"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-1 leading-snug">
                      {ach.info}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="w-full bg-slate-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden mr-4">
                      <div
                        className="bg-primary h-full transition-all"
                        style={{
                          width: `${Math.min((ach.value / ach.target) * 100, 100)}%`,
                        }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground whitespace-nowrap">
                      {ach.value.toLocaleString()} /{" "}
                      {ach.target.toLocaleString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
