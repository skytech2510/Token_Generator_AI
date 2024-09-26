import Float "mo:base/Float";
import Nat "mo:base/Nat";
import Nat64 "mo:base/Nat64";
import Principal "mo:base/Principal";
import Time "mo:base/Time";

import Icp "../candid/icp";
import Icrc2 "../candid/icrc2";
import DbUpdate "../database/update";
import Output "../types/output";
import Constants "../utils/constants";
import Swap "swap";

module Transfers {
    public class transfers(dbUpdate : DbUpdate.Update) {
        let icpLedger = actor (Constants.IcpLedgerCanister) : Icp.Self;
        let bitsLedger = actor (Constants.BitsCanister) : Icrc2.Self;
        let icpFee = Constants.IcpFee;
        let swap = Swap.swap(icpLedger);
        var burned_bits : Float = 0;
        var burned_exe : Float = 0;

        public func transfer_icp_to_backend({
            user : Principal;
            amount : Nat;
            token_id : Text;
        }) : async Output.OperationResult {
            let transfer_amt = Nat.sub(amount, icpFee);
            let res = await icpLedger.icrc2_transfer_from({
                fee = null;
                memo = null;
                spender_subaccount = null;
                from = {
                    owner = user;
                    subaccount = null;
                };
                to = {
                    owner = Principal.fromText(Constants.BackendCanisterId);
                    subaccount = null;
                };
                created_at_time = ?Nat64.fromIntWrap(Time.now());
                amount = transfer_amt;
            });

            switch (res) {
                case (#Ok(_block_index)) {
                    // distribute icp of backend canister
                    let _res1 = await distribute_icp({
                        amount = transfer_amt;
                        token_id;
                        user;
                    });
                    return #ok("ICP transferred successfully");
                };
                case (#Err(_err)) {
                    return #err(["Failed to transfer ICP"]);
                };
            };
        };

        // returns amount of icp transferred
        public func transfer_icp({ amount : Nat; user : Text }) : async Nat {
            let transfer_amt = Nat.sub(amount, icpFee);
            let res = await icpLedger.icrc1_transfer({
                to = {
                    owner = Principal.fromText(user);
                    subaccount = null;
                };
                fee = null;
                memo = null;
                from_subaccount = null;
                created_at_time = ?Nat64.fromIntWrap(Time.now());
                amount = transfer_amt;
            });
            switch (res) {
                case (#Ok(_transaction_idx)) {
                    return transfer_amt;
                };
                case (#Err(_err)) {
                    return 0;
                };
            };
        };

        // returns amount of bits burned
        public func burn_bits(amount : Nat) : async Nat {
            let swap_res = await swap.swap_icp_to_bits(amount);
            switch (swap_res) {
                case (#ok(bits_amt)) {
                    let burn_res = await bitsLedger.icrc1_transfer({
                        to = {
                            owner = Principal.fromText(Constants.BitsLedgerPrincipal);
                            subaccount = null;
                        };
                        fee = null;
                        memo = null;
                        from_subaccount = null;
                        created_at_time = ?Nat64.fromIntWrap(Time.now());
                        amount = bits_amt;
                    });
                    switch (burn_res) {
                        case (#Ok(_transaction_idx)) {
                            return bits_amt;
                        };
                        case (#Err(_err)) {
                            return 0;
                        };
                    };
                };
                case (#err(_err)) {
                    return 0;
                };
            };
        };

        public func distribute_icp({
            amount : Nat;
            token_id : Text;
            user : Principal;
        }) : async Nat {
            let bits_to_burn : Nat = Nat.div(Nat.mul(amount, 15), 100);
            let to_sagar : Nat = Nat.div(Nat.mul(amount, 25), 100);
            let to_breakingbits : Nat = Nat.div(Nat.mul(amount, 45), 100);
            let to_exe : Nat = amount - (bits_to_burn + to_sagar + to_breakingbits);

            // step 1 : transfer to sagar
            let res1 = await transfer_icp({
                amount = to_sagar;
                user = Constants.SagarICPTransferPrincipal;
            });

            // step 2 : transfer to breaking bits
            let res2 = await transfer_icp({
                amount = to_breakingbits;
                user = Constants.BreakingBitsICPTransferPrincipal;
            });

            // step 3 : transfer to exe
            let exe_transferred = await transfer_icp({
                amount = to_exe;
                user = Constants.ExeICPTransferPrincipal;
            });

            // step 4 : burn bits
            let bits_burned = await burn_bits(bits_to_burn);

            // update tokens table with bits evaporated
            let _res4 = await dbUpdate.update_bits_evaporated({
                token_id;
                bits_evaporated = (Float.fromInt(bits_burned) / Constants.e8s);
            });

            var burned_bits_icp = 0;
            if (bits_burned > 0) {
                burned_bits_icp := bits_to_burn;
                burned_bits := Float.fromInt(burned_bits_icp) / Constants.e8s;
            };

            var burned_exe_icp = 0;
            if (exe_transferred > 0) {
                burned_exe_icp := to_exe;
                burned_exe := Float.fromInt(burned_exe_icp) / Constants.e8s;
            };

            // add new transfer details in table of transfers
            let _res5 = await dbUpdate.add_new_transfer({
                sender_pid = user;
                token_id;
                burned_bits = (Float.fromInt(burned_bits_icp) / Constants.e8s);
                to_sagar = (Float.fromInt(res1) / Constants.e8s);
                to_breaking_bits = (Float.fromInt(res2) / Constants.e8s);
                to_exe = (Float.fromInt(exe_transferred) / Constants.e8s);
            });

            return 1;
        };

        public func get_burned_bits() : Float {
            return burned_bits;
        };

        public func get_burned_exe() : Float {
            return burned_exe;
        };

        public func get_burned_tokens() : Output.BurnedTokenOutput {
            {
                burned_bits;
                burned_exe;
            };
        };
    };
};
