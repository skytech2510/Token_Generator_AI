import Nat "mo:base/Nat";
import Nat64 "mo:base/Nat64";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Time "mo:base/Time";

import Exchange "../candid/exchange";
import Icp "../candid/icp";
import Constants "../utils/constants";

module Swap {
    public class swap(icpLedger : Icp.Self) {

        let icpCanister = Constants.IcpLedgerCanister;
        let bitsCanister = Constants.BitsCanister;
        let exchangeCanitser = "jrlks-saaaa-aaaag-qj7kq-cai"; // Icp/Bits
        let exchange = actor (exchangeCanitser) : Exchange.Self; // Icp/Bits
        let icpFee = Constants.IcpFee;
        let bitsFee = Constants.BitsFee;

        public func approve_swappool(amount : Nat) : async Icp.Result_2 {
            let res = await icpLedger.icrc2_approve({
                fee = null;
                memo = null;
                from_subaccount = null;
                created_at_time = ?Nat64.fromIntWrap(Time.now());
                amount = amount;
                expected_allowance = null;
                expires_at = null;
                spender = {
                    owner = Principal.fromText(exchangeCanitser);
                    subaccount = null;
                };
            });
            return res;
        };

        // return amount of bits withdrawn
        public func swap_icp_to_bits(amount : Nat) : async Result.Result<Nat, Exchange.Error> {
            // bcz here there are fees for approve and deposit so reduce the amount

            // make approve call for swap pool
            let approve_amount = Nat.sub(amount, icpFee);
            let approve_res = await approve_swappool(approve_amount);

            switch (approve_res) {
                case (#Ok(_block_index)) {
                    //depositFrom method to deposit token in exchange
                    let deposit_amount = Nat.sub(approve_amount, icpFee);
                    let deposit_res = await exchange.depositFrom({
                        fee = icpFee;
                        token = icpCanister;
                        amount = deposit_amount;
                    });

                    switch (deposit_res) {
                        case (#ok(deposit_amt)) {
                            //swap tokens on exchange
                            let swap_res = await exchange.swap({
                                amountIn = Nat.toText(deposit_amt);
                                amountOutMinimum = Nat.toText(0);
                                zeroForOne = false;
                            });

                            switch (swap_res) {
                                case (#ok(received_amt)) {
                                    //withdraw tokens from exchange
                                    let withdraw_res = await exchange.withdraw({
                                        fee = bitsFee;
                                        amount = received_amt;
                                        token = bitsCanister;
                                    });
                                    switch (withdraw_res) {
                                        case (#ok(withdraw_amount)) {
                                            return #ok(withdraw_amount);
                                        };
                                        case (#err(err)) {
                                            return #err(err);
                                        };
                                    };
                                };
                                case (#err(err)) {
                                    return #err(err);
                                };
                            };
                        };
                        case (#err(err)) {
                            return #err(err);
                        };
                    };
                };
                case (#Err(_err)) {
                    return #err(#InternalError("Approve failed for swap pool"));
                };
            };
        };
    };
};
