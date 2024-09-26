import { create } from "zustand";

// Define the interface for the AuthStore state
interface AuthStore {
  wallet: string; // Could be "plug" or "bitfinity"
  principalId: string; 
  setWallet: (wallet: string) => void; 
  setPrincipalId: (principalId: string) => void; 
}

// Create the Zustand store
const useAuthStore = create<AuthStore>((set) => ({
  wallet: "", 
  principalId: "", 
  setWallet: (wallet) => set({ wallet }),
  setPrincipalId: (principalId) => set({ principalId }),
}));

export default useAuthStore;
