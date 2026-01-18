import { data } from "./data";
import PushView from "./PushView";

async function getPlayerData() {
  return data;
}

export default async function Page() {
  const data = await getPlayerData();

  return <PushView rawData={data} />;
}
