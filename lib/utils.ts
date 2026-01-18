import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// utils/process-players.ts
export function processPlayersStats(items: any[]) {
  return items.map(player => {
    const attacks = player.logs.filter((l: any) => l.type === "attack");
    const defenses = player.logs.filter((l: any) => l.type === "defense");

    const totalAttackGain = attacks.reduce((acc: number, curr: any) => acc + curr.diff, 0);
    const totalDefenseLoss = defenses.reduce((acc: number, curr: any) => acc + curr.diff, 0);

    return {
      tag: player.tag,
      name: player.name,
      trophies: player.trophies,
      attackCount: attacks.length,
      attackGain: totalAttackGain,
      defenseCount: defenses.length,
      defenseLoss: totalDefenseLoss,
      netChange: totalAttackGain + totalDefenseLoss,
      seasonId: player.seasonId
    };
  });
}

// utils/report-generator.ts

export function generateDailyReport(items: any[], targetDate?: string) {
  // Se não passar data, pega a data de hoje (YYYY-MM-DD)
  const dateToFilter = targetDate || new Date().toISOString().split('T')[0];

  const report = items.map(player => {
    // Filtra logs apenas do dia escolhido
    const dailyLogs = player.logs.filter(log => {
      const logDate = new Date(log.timestamp).toISOString().split('T')[0];
      return logDate === dateToFilter;
    });

    const attacks = dailyLogs.filter(l => l.type === "attack");
    const defenses = dailyLogs.filter(l => l.type === "defense");

    const gain = attacks.reduce((acc, curr) => acc + curr.diff, 0);
    const loss = defenses.reduce((acc, curr) => acc + curr.diff, 0); // diff já é negativo no seu JSON

    return {
      name: player.name,
      gain: gain,
      attackCount: attacks.length,
      loss: loss,
      defenseCount: defenses.length,
      final: player.trophies,
    };
  });

  // Ordena por troféus finais (como no seu exemplo)
  return report.sort((a, b) => b.final - a.final);
}

// Helper para transformar números em sobrescrito (¹²³...)
const toSuperscript = (num: number) => {
  const map: any = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
  return num.toString().split('').map(d => map[d] || d).join('');
};