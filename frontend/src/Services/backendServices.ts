import { idlFactory as backendFactory } from "../Candid/js/backend.did.js";
import { _SERVICE as backendActor } from "../Candid/ts/backend.did.js";
import { backendCanisterId } from "Utils/constants.js";
import { host } from "Utils/constants.js";
import {
  UploadFile,
  CreateToken,
  GetTokensByPidOutput,
} from "../Candid/ts/backend.did.js";

class backendServices {
  Actor: backendActor | undefined;
  constructor() {
    this.Actor = undefined;
  }

  async initThroughPlug(): Promise<boolean> {
    try {
      console.log("initThroughPlug - backendCanisterId : ", backendCanisterId);
      this.Actor = await window.ic?.plug?.createActor({
        canisterId: backendCanisterId,
        interfaceFactory: backendFactory,
      });
      console.log("initThroughPlug - this.Actor : ", this.Actor);
      return true;
    } catch (e) {
      console.error("init Actor through plug error", e);
      return false;
    }
  }

  async initThroughBitfinity(): Promise<boolean> {
    try {
      this.Actor = await window.ic?.infinityWallet?.createActor({
        canisterId: backendCanisterId,
        interfaceFactory: backendFactory,
        host,
      });
      return true;
    } catch (e) {
      console.error("init Actor through bitfinity error", e);
      return false;
    }
  }

  // to upload image use function which in "Utils/functions.ts" bcz it will calling this function
  async uploadLogo(params: UploadFile): Promise<string | undefined> {
    const res = await this.Actor?.uploadImage(params);
    return res;
  }

  async uniqueTokenName(tokenName: string): Promise<boolean | undefined> {
    const res = await this.Actor?.is_unique_token_name(tokenName);
    return res;
  }

  async uniqueTokenSymbol(tokenSymbol: string): Promise<boolean | undefined> {
    const res = await this.Actor?.is_unique_token_symbol(tokenSymbol);
    return res;
  }

  // this will return icp value already multiply by 10^8
  async usdToIcp(usd: number): Promise<bigint | undefined> {
    const res = await this.Actor?.usd_to_icp(usd);
    return res;
  }

  async createToken(
    params: CreateToken
  ): Promise<{ ok: string } | { err: string[] } | undefined> {
    const res = await this.Actor?.create_token(params);
    return res;
  }

  async getTotalBitsEvaporated(): Promise<number | undefined> {
    const res = await this.Actor?.get_total_bits_evaporated();
    return res;
  }

  async getUserTokens(): Promise<GetTokensByPidOutput | undefined> {
    const res = await this.Actor?.get_user_tokens();
    return res;
  }
}

const backendServiceInstance = new backendServices();
export default backendServiceInstance;
