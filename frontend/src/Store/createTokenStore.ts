import { Principal } from "@dfinity/principal";
import { create } from "zustand";
import { Token } from "./userStore";

import { CreateToken } from "Candid/ts/backend.did";
import backendServiceInstance from "Services/backendServices";
import bitfinityServiceInstance from "Services/bitfinityServices";
import plugServiceInstance from "Services/plugServices";
import { upload_img } from "Utils/functions";
import useAuthStore from "./authStore";
import useRouteStore from "./routeStore";
import useStoryStore from "./storyStore";
import useUserStore from "./userStore";

interface CreateTokenStore {
  currentStep: number;
  totalStep: number;
  name: string;
  symbol: string;
  coreTraits: string[];
  file: File | null;
  logoFilePath: string;
  supply: number;
  fee: number;
  isConfirmationVisible: boolean;
  isCooking: boolean;
  errorMessage: string;
  radioOption: string;
  goToNextStep: () => void;
  goBack: () => void;
  setField: (
    key:
      | "name"
      | "symbol"
      | "coreTraits"
      | "logoFilePath"
      | "supply"
      | "fee"
      | "file"
      | "isCooking"
      | "errorMessage"
      | "radioOption",
    value: string | number | File | boolean | string[]
  ) => void;
  showConfirmation: () => void;
  cookToken: (token: Token, radioOption: string, file: File) => Promise<void>;
  resetForm: () => void;
}

const useCreateTokenStore = create<CreateTokenStore>()((set, get) => ({
  currentStep: 1,
  totalStep: 3,
  name: "",
  symbol: "",
  coreTraits: [],
  file: null,
  logoFilePath: "",
  supply: 0,
  fee: 0,
  errorMessage: "",
  isConfirmationVisible: false,
  isCooking: false,
  radioOption: "",
  goToNextStep: () => {
    set((s) => ({ currentStep: Math.min(3, s.currentStep + 1) }));
  },
  goBack: () => {
    if (get().isConfirmationVisible) {
      set({ isConfirmationVisible: false, currentStep: 3 });
    } else {
      set((s) => ({ currentStep: Math.max(s.currentStep - 1, 0) }));
    }
  },
  setField: (key, value) => {
    set({ [key]: value });
    if (key === "logoFilePath") {
      useStoryStore.getState().setImageDataUrl(value as string);
    }
  },
  showConfirmation: () => {
    set({ isConfirmationVisible: true });
  },
  resetForm: () => {
    set({
      currentStep: 1,
      name: "",
      symbol: "",
      coreTraits: [],
      supply: 0,
      fee: 0,
      logoFilePath: "",
      isConfirmationVisible: false,
      isCooking: false,
      radioOption: "",
    });
  },
  cookToken: async (token: Token, radioOption: string, file: File) => {
    useStoryStore.getState().setStage("token_cooking");
    await new Promise((resolve) => setTimeout(resolve, 10));
    set({ isCooking: true, errorMessage: "" });
    const { symbol, evaporation: fee, name, coreTraits } = token;

    const principalId = useAuthStore.getState().principalId;

    const usd = await backendServiceInstance.usdToIcp(19.98);
    console.log("onConfirm - usd", usd);
    if (usd === undefined) {
      throw new Error("USD to ICP conversion failed");
    }

    var wallet = localStorage.getItem("_loginType");
    let approvalResp;
    if (wallet === "plug") {
      approvalResp = await plugServiceInstance.icp_approve(usd);
      console.log("onConfirm - approvalResp - plug", approvalResp);
    } else {
      approvalResp = await bitfinityServiceInstance.icp_approve(usd);
      console.log("onConfirm - approvalResp - bitfinity", approvalResp);
    }

    if (approvalResp === false) {
      throw new Error("ICP Approval failed");
    }

    const logoUrl = await upload_img(file);
    console.log("onConfirm - logoUrl", logoUrl);

    if (logoUrl === undefined) {
      throw new Error("Unable to fetch logo URL");
    }

    const createTokenPayload: CreateToken = {
      token_symbol: symbol,
      transfer_fee: BigInt(fee * 1e8),
      metadata: [["icrc1:logo", { Text: logoUrl }]],
      is_blackholed: radioOption === "black_holed" ? true : false,
      initial_balances: [
        [{ owner: Principal.fromText(principalId), subaccount: [] }, BigInt(0)],
      ],
      icp_amount: BigInt(usd),
      token_name: name,
      token_core_traits: coreTraits.join(","),
    };

    console.log("onConfirm - createTokenPayload", createTokenPayload);

    const createTokenResp = await backendServiceInstance.createToken(
      createTokenPayload
    );
    console.log("onConfirm - Token created response - ", createTokenResp);

    if (
      typeof (createTokenResp as { err: Array<string> }).err !== "undefined" &&
      (createTokenResp as { err: Array<string> }).err.length > 0
    ) {
      throw new Error("Token creation failed");
    }

    useUserStore.getState().addToken(token);
    get().resetForm();
    useRouteStore.getState().openTokenPreview(token);
    useStoryStore.getState().setStage("initial");
  },
}));

export default useCreateTokenStore;
