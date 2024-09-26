import AlfangoDB "mo:alfangodb/AlfangoDB";
import Debug "mo:base/Debug";
import Nat64 "mo:base/Nat64";
import Time "mo:base/Time";

import Input "../types/input";
import Output "../types/output";
import Constants "../utils/constants";

module DbUpdate {
    public class Update(alfangoDB : AlfangoDB.AlfangoDB) {

        public func add_new_token(args : Input.AddNewToken) : async Output.OperationResult {
            Debug.print("add_new_token args : " #debug_show (args));
            let res = await AlfangoDB.updateOperation({
                updateOpsInput = #CreateItemInput({
                    databaseName = Constants.BreakingBitsDatabase;
                    tableName = Constants.TokenTable;
                    attributeDataValues = [
                        ("creator_pid", #principal(args.user)),
                        ("name", #text(args.token_name)),
                        ("symbol", #text(args.token_symbol)),
                        ("core_traits", #text(args.token_core_traits)),
                        ("logo_url", #text(args.logo_url)),
                        ("initial_supply", #nat(args.initial_supply)),
                        ("initial_fee", #nat(args.initial_fee)),
                        ("canister_id", #text(args.canister_id)),
                        ("index_canister_id", #text(args.index_canister_id)),
                        ("bits_evaporated", #float(args.bits_evaporated)),
                        ("token_created_at", #nat64(Nat64.fromIntWrap(Time.now()))),
                    ];
                });
                alfangoDB;
            });

            switch res {
                case (#CreateItemOutput(#ok({ id }))) #ok(id);
                case (#CreateItemOutput(#err(errors))) #err(errors);
                case (_) #err(["Failed to register user"]);
            };
        };

        public func update_bits_evaporated({
            token_id : Text;
            bits_evaporated : Float;
        }) : async Output.OperationResult {
            let res = await AlfangoDB.updateOperation({
                updateOpsInput = #UpdateItemInput({
                    databaseName = Constants.BreakingBitsDatabase;
                    tableName = Constants.TokenTable;
                    id = token_id;
                    attributeDataValues = [
                        ("bits_evaporated", #float(bits_evaporated)),
                    ];
                });
                alfangoDB;
            });
            switch res {
                case (#UpdateItemOutput(#ok(_))) #ok("Bits evaporated updated successfully");
                case (#UpdateItemOutput(#err(errors))) #err(errors);
                case (_) #err(["Failed to update bits evaporated"]);
            };
        };

        public func add_new_transfer(args : Input.AddNewTransfer) : async Output.OperationResult {
            let res = await AlfangoDB.updateOperation({
                updateOpsInput = #CreateItemInput({
                    databaseName = Constants.BreakingBitsDatabase;
                    tableName = Constants.TransfersTable;
                    attributeDataValues = [
                        ("sender_pid", #principal(args.sender_pid)),
                        ("token_id", #text(args.token_id)),
                        ("burned_bits", #float(args.burned_bits)),
                        ("to_sagar", #float(args.to_sagar)),
                        ("to_breaking_bits", #float(args.to_breaking_bits)),
                        ("to_exe", #float(args.to_exe)),
                    ];
                });
                alfangoDB;
            });

            switch res {
                case (#CreateItemOutput(#ok({ id }))) #ok(id);
                case (#CreateItemOutput(#err(errors))) #err(errors);
                case (_) #err(["Failed to register user"]);
            };
        };
    };
};
