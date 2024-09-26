import AlfangoDB "mo:alfangodb/AlfangoDB";
import Bool "mo:base/Bool";
import Buffer "mo:base/Buffer";
import Nat64 "mo:base/Nat64";
import Principal "mo:base/Principal";

import Input "../types/input";
import Output "../types/output";
import Constants "../utils/constants";

module DbRead {
    public class Read(alfangoDB : AlfangoDB.AlfangoDB) {
        public func get_tokens_by_pid(args : Input.GetTokensByPid) : Output.GetTokensByPidOutput {
            let res = AlfangoDB.queryOperation({
                queryOpsInput = #ScanInput({
                    databaseName = Constants.BreakingBitsDatabase;
                    tableName = Constants.TokenTable;
                    filterExpressions = [{
                        attributeName = "creator_pid";
                        filterExpressionCondition = #EQ(#principal(args.pid));
                    }];
                });
                alfangoDB;
            });

            switch (res) {
                case (#ScanOutput(#ok(items))) {
                    let tokenBuffer = Buffer.Buffer<Output.GetTokensByPid>(0);
                    for (item in items.vals()) {
                        let token = {
                            creator_pid = switch (item.item[0]) {
                                case ("creator_pid", #principal(pid)) pid;
                                case _ Principal.fromText("");
                            };
                            name = switch (item.item[1]) {
                                case ("name", #text(name)) name;
                                case _ "";
                            };
                            symbol = switch (item.item[2]) {
                                case ("symbol", #text(symbol)) symbol;
                                case _ "";
                            };
                            core_traits = switch (item.item[2]) {
                                case ("core_traits", #text(core_traits)) core_traits;
                                case _ "";
                            };
                            logo_url = switch (item.item[3]) {
                                case ("logo_url", #text(url)) url;
                                case _ "";
                            };
                            initial_supply = switch (item.item[4]) {
                                case ("initial_supply", #nat(supply)) supply;
                                case _ 0;
                            };
                            initial_fee = switch (item.item[5]) {
                                case ("initial_fee", #nat(fee)) fee;
                                case _ 0;
                            };
                            canister_id = switch (item.item[6]) {
                                case ("canister_id", #text(id)) id;
                                case _ "";
                            };
                            index_canister_id = switch (item.item[7]) {
                                case ("index_canister_id", #text(id)) id;
                                case _ "";
                            };
                            bits_evaporated = switch (item.item[8]) {
                                case ("bits_evaporated", #float(bits)) bits;
                                case _ 0.0;
                            };
                            token_created_at = switch (item.item[9]) {
                                case ("token_created_at", #nat64(created)) created;
                                case _ Nat64.fromNat(0);
                            };
                        };
                        tokenBuffer.add(token);
                    };
                    let tokens = Buffer.toArray(tokenBuffer);
                    #ok(tokens);
                };
                case (#ScanOutput(#err(errors))) #err(errors);
                case _ #err(["Failed to retrieve user info"]);
            };
        };

        public func unique_name(name : Text) : Bool {
            let res = AlfangoDB.queryOperation({
                queryOpsInput = #ScanInput({
                    databaseName = Constants.BreakingBitsDatabase;
                    tableName = Constants.TokenTable;
                    filterExpressions = [{
                        attributeName = "name";
                        filterExpressionCondition = #EQ(#text(name));
                    }];
                });
                alfangoDB;
            });

            switch (res) {
                case (#ScanOutput(#ok(item))) (item.size() == 0);
                case (#ScanOutput(#err(_errors))) false;
                case _ false;
            };
        };

        public func unique_symbol(symbol : Text) : Bool {
            let res = AlfangoDB.queryOperation({
                queryOpsInput = #ScanInput({
                    databaseName = Constants.BreakingBitsDatabase;
                    tableName = Constants.TokenTable;
                    filterExpressions = [{
                        attributeName = "symbol";
                        filterExpressionCondition = #EQ(#text(symbol));
                    }];
                });
                alfangoDB;
            });

            switch (res) {
                case (#ScanOutput(#ok(item))) (item.size() == 0);
                case (#ScanOutput(#err(_errors))) false;
                case _ false;
            };
        };
    };
};
