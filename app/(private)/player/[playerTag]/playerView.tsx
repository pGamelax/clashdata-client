"use client";

import React from "react";
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

// --- INTERFACES DE APOIO ---
interface Achievement {
  name: string;
  stars: number;
  value: number;
  target: number;
  info: string;
  id: number;
}

interface Equipment {
  name: string;
  level: number;
  maxLevel: number;
  village: string;
}

interface Hero {
  name: string;
  level: number;
  maxLevel: number;
  village: string;
  equipment?: Equipment[];
}

interface PlayerLabel {
  id: number;
  name: string;
  iconUrls: {
    small: string;
    medium: string;
  };
}

interface UserData {
  name: string;
  tag: string;
  townHallLevel: number;
  expLevel: number;
  trophies: number;
  bestTrophies: number;
  warStars: number;
  role: string;
  builderHallLevel?: number;
  builderBaseTrophies?: number;
  clanCapitalContributions: number;
  leagueTier?: {
    iconUrls: {
      large: string;
      medium: string;
      small: string;
    };
  };
  clan?: {
    tag: string;
    name: string;
    badgeUrls: {
      small: string;
    };
  };
  labels: PlayerLabel[];
  heroes: Hero[];
  achievements: Achievement[];
}

// --- INTERFACES DE GUERRA (RAW DATA) ---
interface RawAttack {
  stars: number;
  destructionPercentage: number;
}

interface RawWarItem {
  war_data: {
    endTime: string;
    type: string;
    clan: { stars: number };
    opponent: { name: string; tag: string; stars: number };
  };
  attacks?: RawAttack[];
}

interface WarHistoryProps {
  items: RawWarItem[];
}

// --- PROPS DO COMPONENTE PRINCIPAL ---
interface PlayerViewProps {
  userData: UserData;
  warHistory: WarHistoryProps;
}

export function PlayerView({ userData, warHistory }: PlayerViewProps) {
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
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white dark:bg-zinc-900/50 p-8 rounded-[2.5rem] border border-border/50 shadow-sm">
            <div className="flex items-center gap-6">
              <div className="relative">
                {userData.leagueTier?.iconUrls?.large && (
                  <img
                    src={userData.leagueTier.iconUrls.large}
                    alt="League"
                    className="w-20 h-20 lg:w-24 lg:h-24 object-contain"
                  />
                )}
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
                  {userData.clan && (
                    <>
                      <img
                        src={userData.clan.badgeUrls.small}
                        className="w-5 h-5"
                        alt="Clan"
                      />
                      <span className="font-bold text-sm text-primary">
                        {userData.clan.name}
                      </span>
                    </>
                  )}
                  <span className="text-xs text-muted-foreground uppercase tracking-widest px-2 py-0.5 bg-slate-100 dark:bg-zinc-800 rounded-md">
                    {userData.role}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {userData.labels.map((label) => (
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
                  Análise detalhada de ataques
                </p>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-900/50 p-2 rounded-[2rem] border border-border/50 shadow-sm">
              {/* Passamos o objeto warHistory que agora está tipado */}
              <WarHistorySection rawData={warHistory} />
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
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
                  .filter((h) => h.village === "home")
                  .map((hero, i) => (
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
                        {hero.equipment?.map((eq, j) => (
                          <div
                            key={j}
                            className="flex flex-col p-3 bg-slate-50 dark:bg-zinc-800 rounded-2xl border border-border/40"
                          >
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
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Centro de Vila
                    </span>
                    <span className="font-bold">
                      Nível {userData.townHallLevel}
                    </span>
                  </div>
                </div>
                <div className="bg-white dark:bg-zinc-900/50 p-6 rounded-3xl border border-border/50 shadow-sm">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Base do Construtor
                    </span>
                    <span className="font-bold">
                      Nível {userData.builderHallLevel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
