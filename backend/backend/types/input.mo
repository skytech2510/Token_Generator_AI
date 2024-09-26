import Bool "mo:base/Bool";
import Float "mo:base/Float";
import Principal "mo:base/Principal";
module Input {
    public type UploadFile = {
        fileBlob : Blob;
        fileName : Text;
        fileType : Text;
    };
    public type Account = { owner : Principal; subaccount : ?Subaccount };

    public type Subaccount = Blob;
    public type MetadataValue = {
        #Int : Int;
        #Nat : Nat;
        #Blob : Blob;
        #Text : Text;
    };
    ///////////////////////////////////////////////// read db //////////////////////////////////////////////////

    public type GetTokensByPid = {
        pid : Principal;
    };

    ///////////////////////////////////////////////// update db //////////////////////////////////////////////////

    public type AddNewToken = {
        token_name : Text;
        token_symbol : Text;
        token_core_traits : Text;
        user : Principal;
        logo_url : Text;
        initial_supply : Nat;
        initial_fee : Nat;
        canister_id : Text;
        index_canister_id : Text;
        bits_evaporated : Float;
    };

    public type AddNewTransfer = {
        sender_pid : Principal;
        token_id : Text;
        burned_bits : Float;
        to_sagar : Float;
        to_breaking_bits : Float;
        to_exe : Float;
    };

    ///////////////////////////////////// token ////////////////////////////////////////////////////////////

    public type CreateToken = {
        is_blackholed : Bool;
        token_name : Text;
        token_symbol : Text;
        token_core_traits : Text;
        initial_balances : [(Account, Nat)];
        metadata : [(Text, MetadataValue)];
        transfer_fee : Nat;
        icp_amount : Nat;
    };

    public type FeatureFlags = { icrc2 : Bool };

    public type ChangeFeeCollector = { #SetTo : Account; #Unset };

    public type UpgradeArgs = {
        token_symbol : ?Text;
        transfer_fee : ?Nat;
        metadata : ?[(Text, MetadataValue)];
        maximum_number_of_accounts : ?Nat64;
        accounts_overflow_trim_quantity : ?Nat64;
        change_fee_collector : ?ChangeFeeCollector;
        max_memo_length : ?Nat16;
        token_name : ?Text;
        feature_flags : ?FeatureFlags;
    };

    public type InitArgs = {
        decimals : ?Nat8;
        token_symbol : Text;
        transfer_fee : Nat;
        metadata : [(Text, MetadataValue)];
        minting_account : Account;
        initial_balances : [(Account, Nat)];
        maximum_number_of_accounts : ?Nat64;
        accounts_overflow_trim_quantity : ?Nat64;
        fee_collector_account : ?Account;
        archive_options : {
            num_blocks_to_archive : Nat64;
            max_transactions_per_response : ?Nat64;
            trigger_threshold : Nat64;
            max_message_size_bytes : ?Nat64;
            cycles_for_archive_creation : ?Nat64;
            node_max_memory_size_bytes : ?Nat64;
            controller_id : Principal;
        };
        max_memo_length : ?Nat16;
        token_name : Text;
        feature_flags : ?FeatureFlags;
    };

    public type LedgerArg = { #Upgrade : ?UpgradeArgs; #Init : InitArgs };

    public type InitArg = {
        ledger_id : Principal;
    };

    public type UpgradeArg = {
        ledger_id : ?Principal;
    };

    public type IndexCanisterInitArg = {
        #Init : InitArg;
        #Upgrade : UpgradeArg;
    };
};
