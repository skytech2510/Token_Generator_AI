import XRC "mo:xrc-types";
import ExperimentalCycles "mo:base/ExperimentalCycles";
import Error "mo:base/Error";
import Nat64 "mo:base/Nat64";
import Float "mo:base/Float";
import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Int64 "mo:base/Int64";
import Time "mo:base/Time";

module Xrc {
    public class XRCService() {
        public func getExchangeRate(base : Text, quote : Text) : async Float {
            let xrc = XRC.xrc;

            ExperimentalCycles.add<system>(1_000_000_000);

            let res = await xrc.get_exchange_rate({
                base_asset = {
                    class_ = #Cryptocurrency;
                    symbol = base;
                };
                quote_asset = {
                    class_ = #FiatCurrency;
                    symbol = quote;
                };
                timestamp = ?Nat64.fromIntWrap(Time.now() / 1000000000);
            });

            switch (res) {
                case (#Ok(exchangeRate)) {
                    let divisor : Nat64 = Nat64.fromNat(Nat.pow(10, Nat32.toNat(exchangeRate.metadata.decimals)));
                    let finalValue : Float = Float.fromInt64(Int64.fromNat64(exchangeRate.rate)) / Float.fromInt64(Int64.fromNat64(divisor));
                    return finalValue;
                };
                case (#Err(err)) {
                    throw Error.reject(debug_show (err));
                    return 0;
                };
            };
        };
    };
};
