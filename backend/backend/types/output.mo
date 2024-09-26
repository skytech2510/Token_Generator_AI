import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";

module Output {
    public type uploadFile = Text;
    public type OperationResult = Result.Result<Text, [Text]>;

    ///////////////////////////////////////////
    public type GetTokensByPid = {
        creator_pid : Principal;
        name : Text;
        symbol : Text;
        core_traits : Text;
        logo_url : Text;
        initial_supply : Nat;
        initial_fee : Nat;
        canister_id : Text;
        index_canister_id : Text;
        bits_evaporated : Float;
        token_created_at : Nat64;
    };
    public type GetTokensByPidOutput = Result.Result<[GetTokensByPid], [Text]>;

    public type BurnedTokenOutput = { burned_bits : Float; burned_exe : Float }
    ///////////////////////////////////////////////////////////////
};
