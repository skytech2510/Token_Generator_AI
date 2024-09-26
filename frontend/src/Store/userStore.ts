import { create } from "zustand";

export interface Token {
  name: string;
  symbol: string;
  coreTraits: string[];
  supply: number;
  evaporation: number;
  transaction: number;
  image: string;
  mintedAt: string; // Date.toISOString
  canisterId: string;
}
interface UserStore {
  tokens: Token[];
  setTokens: (tokens: Token[]) => void;
  addToken: (token: Token) => void;
}

const useUserStore = create<UserStore>()((set) => ({
  tokens: [],
  setTokens: (tokens) => {
    set({ tokens });
  },
  addToken: (token) => {
    set((s) => {
      return { tokens: [token, ...s.tokens] };
    });
  },
}));

export default useUserStore;
