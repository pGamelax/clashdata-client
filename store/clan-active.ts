import { create } from "zustand";

type ClanActive = {
  tag: string;
  setTag: (tag: string) => void;
  getTag: () => string;
};

export const clanActive = create<ClanActive>()((set) => ({
  tag: "",
  setTag: (tag) => set({ tag }),
  getTag: (): string => clanActive.getState().tag,
}));
