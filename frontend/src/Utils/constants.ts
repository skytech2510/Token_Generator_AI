export const LOCAL = "local";

console.log(import.meta.env.VITE_DFX_NETWORK);
export const backendCanisterId =
  import.meta.env.VITE_DFX_NETWORK === LOCAL
    ? import.meta.env.VITE_LOCAL_CANISTERID
    : import.meta.env.VITE_SUBNET_CANISTERID;
console.log("backendCanisterId : ", backendCanisterId);

export const whitelist = [backendCanisterId];

export const host =
  import.meta.env.VITE_DFX_NETWORK === LOCAL
    ? "http://localhost:4943"
    : "https://ic0.app";

export const icpLedgerCanister = import.meta.env.VITE_ICPLEDGERCANISTER;
