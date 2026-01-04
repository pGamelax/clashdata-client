import { api } from "@/lib/api";
import { PlayerView } from "./playerView";

export default async function PlayerProfile({
  params,
}: {
  params: Promise<{ playerTag: string }>;
}) {
  const { playerTag } = await params;
  const userData = await api.players.getInfo("#" + playerTag);
  const warHistory = await api.players.getWarHistory("#" + playerTag);

  return <PlayerView userData={userData} warHistory={warHistory} />;
}
