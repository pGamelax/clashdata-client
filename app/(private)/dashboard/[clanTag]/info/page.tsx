import { api } from "@/lib/api";
import { redirect } from "next/navigation";
import { Trophy, Swords, TrendingUp, Sword } from "lucide-react";
import { InfoView } from "./infoView";

export default async function Dashboard({
  params,
}: {
  params: Promise<{ clanTag: string }>;
}) {
  const user = await api.me();

  if (!user?.session) redirect("/sign-in");

  const { clanTag } = await params;

  const [data, clanData] = await Promise.all([
    api.dashboard.data("%23" + clanTag),
    api.dashboard.clanInfo("%23" + clanTag),
  ]);

  const topPlayers = data.players.slice(0, 15);

  const stats = [
    {
      label: "Vitórias",
      value: clanData.warWins,
      icon: Trophy,
      color: "text-amber-500",
    },
    {
      label: "Derrotas",
      value: clanData.warLosses,
      icon: Sword,
      color: "text-rose-500",
    },
    {
      label: "Total de Guerras",
      value: clanData.totalWars,
      icon: Swords,
      color: "text-indigo-500",
    },
    {
      label: "Taxa de Vitória",
      value: `${((clanData.warWins / clanData.totalWars) * 100).toFixed(2)}%`,
      icon: TrendingUp,
      color: "text-emerald-500",
    },
  ];

  return (
    <InfoView
      clanData={clanData}
      data={data}
      topPlayers={topPlayers}
      clanTag={clanTag}
      stats={stats}
    />
  );
}
