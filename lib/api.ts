import { redirect } from "next/navigation";
import { serverFetch } from "./server-fetch";

const API_URL = "https://api.clashdata.pro";

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
      try {
        const res = await serverFetch(
          `${API_URL}/dashboard/data?clanTag=${encodeURIComponent(clanTag)}`,
        );

        if (res.status === 401) {
          redirect("/dashboard/clans");
        }

        if (!res.ok) {
          throw new Error(`Erro na requisição: ${res.status}`);
        }

        return await res.json();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Erro desconhecido";
        console.error("Erro em data:", message);
        return null; // Ou trate conforme a necessidade da sua UI
      }
    },

    clanInfo: async (clanTag: string) => {
      try {
        const res = await serverFetch(
          `${API_URL}/clans/clan-info?clanTag=${encodeURIComponent(clanTag)}`,
        );

        if (!res.ok) {
          throw new Error(`Erro ao buscar info do clan: ${res.status}`);
        }
        
        return await res.json();
      } catch (err) {
        console.error("Erro em clanInfo:", err);
        throw err; // Repassa o erro para ser tratado pelo Error Boundary do Next.js
      }
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
