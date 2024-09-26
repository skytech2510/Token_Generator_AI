import Cycles "mo:base/ExperimentalCycles";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import { ic } "mo:ic";

import DbUpdate "../database/update";
import Transfers "../services/transfers";
import Input "../types/input";
import Constants "../utils/constants";
import indexWasm "./index_wasm_version";
import Wasm "./wasm_version";

module Token {
    public class Token(dbUpdate : DbUpdate.Update, transfer : Transfers.transfers) {
        /*
    * Create a new icrc3 token canister.
    * The creator of the canister is added as the minting account by default.
    * @params token - init arguments of token.
    */
        public func initialize_token_canister(
            user : Principal,
            {
                token_name : Text;
                token_symbol : Text;
                token_core_traits : Text;
                initial_balances : [(Input.Account, Nat)];
                metadata : [(Text, Input.MetadataValue)];
                transfer_fee : Nat;
                icp_amount : Nat;
                is_blackholed : Bool;
            },
        ) : async Result.Result<Text, [Text]> {

            let mint_acc : Input.Account = {
                owner = Principal.fromText(Constants.MintingAccountController);
                subaccount = null;
            };
            // check if canister has enough cycles.
            let response = await ic.canister_status({
                canister_id = Principal.fromText(Constants.BackendCanisterId);
            });

            let cycles = response.cycles;
            if (cycles < Constants.CyclesLimit) {
                return #err(["Backend canister do not have enough cycles contact developers"]);
            };

            // add cycles to create canister.
            Cycles.add<system>(Constants.CyclesLimit);

            var isBlackholed = is_blackholed;
            var controllers : [Principal] = [
                Principal.fromText(Constants.BackendCanisterId),
                Principal.fromText(Constants.SagarControllerPrincipal),
            ];

            if (isBlackholed) {
                controllers := [Principal.fromText(Constants.BlackholeCanister)];
            };

            // create canister.
            let canister = await ic.create_canister({
                settings = ?{
                    controllers = ?controllers;
                    freezing_threshold = null;
                    reserved_cycles_limit = null;
                    memory_allocation = null;
                    compute_allocation = null;
                };
                sender_canister_version = null;
            });

            let initArgs : Input.InitArgs = {
                decimals = ?8;
                token_symbol;
                transfer_fee;
                metadata;
                minting_account = mint_acc;
                initial_balances;
                maximum_number_of_accounts = null;
                accounts_overflow_trim_quantity = null;
                fee_collector_account = null;
                archive_options = {
                    num_blocks_to_archive = 1000;
                    max_transactions_per_response = null;
                    trigger_threshold = 2000;
                    max_message_size_bytes = null;
                    cycles_for_archive_creation = null;
                    node_max_memory_size_bytes = null;
                    controller_id = user;
                };
                max_memo_length = null;
                token_name;
                feature_flags = ?{ icrc2 = true };
            };

            let ledgerArg : Input.LedgerArg = #Init(initArgs);

            //get wasm version
            let wasmVersion = Wasm.wasm_version();

            // install the token code in empty canister.
            await ic.install_code({
                arg = to_candid (ledgerArg);
                wasm_module = wasmVersion.wasm_blob_icrc3;
                mode = #install;
                canister_id = canister.canister_id;
                sender_canister_version = null;
            });

            // add cycles to create canister.
            Cycles.add<system>(Constants.CyclesLimit);

            // create canister.
            let indexCanister = await ic.create_canister({
                settings = ?{
                    controllers = ?controllers;
                    freezing_threshold = null;
                    reserved_cycles_limit = null;
                    memory_allocation = null;
                    compute_allocation = null;
                };
                sender_canister_version = null;
            });

            let indexArg : Input.IndexCanisterInitArg = #Init({
                ledger_id = canister.canister_id;
            });

            //get wasm version
            let indexWasmVersion = indexWasm.wasm_version();

            // install the token code in empty canister.
            await ic.install_code({
                arg = to_candid (indexArg);
                wasm_module = indexWasmVersion.wasm_blob_v1;
                mode = #install;
                canister_id = indexCanister.canister_id;
                sender_canister_version = null;
            });

            var logo_url = "";
            switch (metadata[0].1) {
                case (#Text(logo)) {
                    logo_url := logo;
                };
                case _ {
                    logo_url := "";
                };
            };

            // add new token details in table of tokens
            let update_res = await dbUpdate.add_new_token({
                token_name;
                token_symbol;
                token_core_traits;
                logo_url;
                initial_supply = initial_balances[0].1;
                initial_fee = transfer_fee;
                canister_id = Principal.toText(canister.canister_id);
                index_canister_id = Principal.toText(indexCanister.canister_id);
                bits_evaporated = 0;
                user;
            });

            switch (update_res) {
                case (#ok(token_id)) {
                    // transfer icp from user to backend
                    let transfer_res = await transfer.transfer_icp_to_backend({
                        user;
                        amount = icp_amount;
                        token_id;
                    });
                    switch (transfer_res) {
                        case (#ok(_text)) {
                            return #ok("Token created successfully");
                        };
                        case (#err(errors)) {
                            return #err(errors);
                        };
                    };
                };
                case (#err(errors)) {
                    return #err(errors);
                };
            };
        };
    };
};
