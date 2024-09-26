import { whitelist, host } from "Utils/constants";
import { Principal } from "@dfinity/principal";
import { idlFactory as icpFactory } from "Candid/js/icp.did";
import { icpLedgerCanister, backendCanisterId } from "Utils/constants";
import { _SERVICE as icpActor, ApproveArgs, Result_2 } from "Candid/ts/icp.did";

class bifinityServices {
  principalId: Principal | undefined;
  icpLedger: icpActor | undefined;
  constructor() {
    this.principalId = undefined;
    this.icpLedger = undefined;
  }

  async isConnected(): Promise<boolean> {
    try {
      return await window.ic.infinityWallet.isConnected();
    } catch (error) {
      console.error("check bitfinity connection error : ", error);
      return false;
    }
  }

  async initIcpLedgerActor(): Promise<boolean> {
    try {
      this.icpLedger = await window.ic?.infinityWallet?.createActor({
        canisterId: icpLedgerCanister,
        interfaceFactory: icpFactory,
      });
      return true;
    } catch (e) {
      console.error("init ICP ledger Actor through bitfinity error", e);
      return false;
    }
  }

  async login(): Promise<boolean> {
    try {
      await window.ic.infinityWallet.requestConnect({ whitelist });
      this.principalId = await window.ic.infinityWallet.getPrincipal();
      this.icpLedger = await window.ic?.infinityWallet?.createActor({
        canisterId: icpLedgerCanister,
        interfaceFactory: icpFactory,
        host,
      });
      return true;
    } catch (error) {
      console.error("bitfinity connect error : ", error);
      return false;
    }
  }

  async getICPFee(): Promise<bigint> {
    console.log("canisterId - getICPFee", icpLedgerCanister);
    if (typeof icpLedgerCanister === "undefined") {
      throw "Some error occured. Please try again.";
    }
    console.log("this.ledgerActor - getICPFee", this.icpLedger);
    const transferFee = await this.icpLedger?.transfer_fee({});
    if (typeof transferFee === "undefined") {
      throw "Some error occured. Please try again.";
    }
    console.log("transfer_fee method  - ICP", transferFee.transfer_fee.e8s);
    return transferFee.transfer_fee.e8s;
  }

  async icp_approve(amount: bigint): Promise<boolean> {
    try {
      const fee = await this.getICPFee();
      console.log("fee - icp_approve", fee);
      let ApproveArgs: ApproveArgs = {
        fee: [BigInt(fee)],
        memo: [],
        from_subaccount: [],
        created_at_time: [BigInt(Date.now() * 1e6)], // in nano second
        amount: BigInt(amount), // Amount
        expected_allowance: [],
        expires_at: [BigInt(Date.now() * 1e6 + 10 * 60 * 1e9)], // expires after (10 min)
        spender: {
          owner: Principal.fromText(backendCanisterId),
          subaccount: [],
        }, // Spender
      };

      const res: Result_2 | undefined = await this.icpLedger?.icrc2_approve(
        ApproveArgs
      );
      if (res !== undefined && "Ok" in res) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("bitfinity approve ICP error : ", error);
      return false;
    }
  }

  async logout(): Promise<boolean> {
    try {
      await window.ic.infinityWallet.disconnect();
      this.principalId = undefined;
      return true;
    } catch (error) {
      console.error("bitfinity disconnect error : ", error);
      return false;
    }
  }
}

const bitfinityServiceInstance = new bifinityServices();
export default bitfinityServiceInstance;
