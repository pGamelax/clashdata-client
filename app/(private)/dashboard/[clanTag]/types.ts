import { LucideIcon } from "lucide-react";

export interface WarAction {
  date: string;
  stars: number;
  destruction: number;
  opponent: string;
}

export interface PlayerStats {
  tag: string;
  name: string;
  allAttacks: WarAction[];
  allDefenses: WarAction[];
}

export interface ProcessedPlayer extends PlayerStats {
  attackCount: number;
  performanceScore: number;
  avgStars: string;
  avgDestruction: string;
  avgDefenseStars: string;
  avgDefenseDestruction: string;
  displayAttacks: WarAction[];
  warCount: number;
}

export interface ClanData {
  name: string;
  tag: string;
  description: string;
  warWins: number;
  warLosses: number;
  totalWars: number;
}

export interface StatItem {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
}

// ESTA É A INTERFACE QUE ESTAVA DANDO ERRO
export interface InfoViewProps {
  clanData: ClanData;
  data: {
    players: PlayerStats[];
  };
  topPlayers: PlayerStats[];
  clanTag: string;
}
