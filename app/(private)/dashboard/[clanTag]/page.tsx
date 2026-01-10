import { api } from "@/lib/api";
import { redirect } from "next/navigation";
import { InfoView } from "./infoView";
import { PlayerStats, ClanData } from "./types";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Clashdata",
};

export default async function Dashboard({
  params,
}: {
  params: Promise<{ clanTag: string }>;
}) {
  const user = await api.me();
  if (!user?.session) redirect("/sign-in");

  const { clanTag } = await params;

  const [data, clanData]: [{ players: PlayerStats[] }, ClanData] =
    await Promise.all([
      api.dashboard.data("#" + clanTag),
      api.dashboard.clanInfo("#" + clanTag),
    ]);

  const topPlayers = data.players.slice(0, 15);

  return (
    <InfoView
      clanData={clanData}
      data={data}
      topPlayers={topPlayers}
      clanTag={clanTag}
    />
  );
}
