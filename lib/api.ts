import { redirect } from "next/navigation";
import { serverFetch } from "./server-fetch";

const API_URL = "http://localhost:3333";

export const api = {
  me: async () => {
    const res = await serverFetch(`${API_URL}/auth/get-session`);
    if (!res.ok) redirect("/sign-in");
    return res.json();
  },

  users: {
    byId: async (id: string) => {
      const res = await serverFetch(`${API_URL}/users/${id}`);
      return res.json();
    },
  },
  dashboard: {
    data: async (clanTag: string) => {
      const res = await serverFetch(`${API_URL}/dashboard/data/${clanTag}`);
      if (res.status === 401) {
        redirect("/dashboard/clans");
      }
      return res.json();
    },
    clanInfo: async (clanTag: string) => {
      const res = await serverFetch(`${API_URL}/clans/clan-info/${clanTag}`);
      return res.json();
    },
  },
  clans: {
    listMyClans: async () => {
      const res = await serverFetch(`${API_URL}/clans/get-clans`);
      return res.json();
    },
  },
  players: {
    getInfo: async (playerTag: string) => {
      const res = await serverFetch(
        `${API_URL}/players/${encodeURIComponent(playerTag)}`,
      );
      return res.json();
    },
    getWarHistory: async (playerTag: string) => {
      const res = await serverFetch(
        `https://api.clashk.ing/player/${encodeURIComponent(playerTag)}/warhits?timestamp_start=0&timestamp_end=2527625513&limit=50`,
      );
      return res.json();
    },
  },
};
