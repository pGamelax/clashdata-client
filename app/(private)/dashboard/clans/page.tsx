import { api } from "@/lib/api";
import { redirect } from "next/navigation";
import { ClansView } from "./clanView";

export default async function ClansPage() {
  const user = await api.me();

  if (!user?.session) {
    redirect("/sign-in");
  }

  const userClans = await api.clans.listMyClans();
  return <ClansView clans={userClans} />;
}
