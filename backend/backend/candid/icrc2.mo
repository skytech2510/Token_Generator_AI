// This is a generated Motoko binding.
// Please use `import service "ic:canister_id"` instead to call canisters on the IC if possible.

module Icrc2{
  public type Account = { owner : Principal; subaccount : ?Blob };
  public type Allowance = { allowance : Nat; expires_at : ?Nat64 };
  public type AllowanceArgs = { account : Account; spender : Account };
  public type Approve = {
    fee : ?Nat;
    from : Account;
    memo : ?Blob;
    created_at_time : ?Nat64;
    amount : Nat;
    expected_allowance : ?Nat;
    expires_at : ?Nat64;
    spender : Account;
  };
  public type ApproveArgs = {
    fee : ?Nat;
    memo : ?Blob;
    from_subaccount : ?Blob;
    created_at_time : ?Nat64;
    amount : Nat;
    expected_allowance : ?Nat;
    expires_at : ?Nat64;
    spender : Account;
  };
  public type ApproveError = {
    #GenericError : { message : Text; error_code : Nat };
    #TemporarilyUnavailable;
    #Duplicate : { duplicate_of : Nat };
    #BadFee : { expected_fee : Nat };
    #AllowanceChanged : { current_allowance : Nat };
    #CreatedInFuture : { ledger_time : Nat64 };
    #TooOld;
    #Expired : { ledger_time : Nat64 };
    #InsufficientFunds : { balance : Nat };
  };
  public type ArchiveOptions = {
    num_blocks_to_archive : Nat64;
    max_transactions_per_response : ?Nat64;
    trigger_threshold : Nat64;
    max_message_size_bytes : ?Nat64;
    cycles_for_archive_creation : ?Nat64;
    node_max_memory_size_bytes : ?Nat64;
    controller_id : Principal;
  };
  public type ArchivedRange = {
    callback : shared query GetBlocksRequest -> async BlockRange;
    start : Nat;
    length : Nat;
  };
  public type ArchivedRange_1 = {
    callback : shared query GetBlocksRequest -> async TransactionRange;
    start : Nat;
    length : Nat;
  };
  public type BlockRange = { blocks : [Value] };
  public type Burn = {
    from : Account;
    memo : ?Blob;
    created_at_time : ?Nat64;
    amount : Nat;
    spender : ?Account;
  };
  public type ChangeFeeCollector = { #SetTo : Account; #Unset };
  public type DataCertificate = { certificate : ?Blob; hash_tree : Blob };
  public type FeatureFlags = { icrc2 : Bool };
  public type GetBlocksRequest = { start : Nat; length : Nat };
  public type GetBlocksResponse = {
    certificate : ?Blob;
    first_index : Nat;
    blocks : [Value];
    chain_length : Nat64;
    archived_blocks : [ArchivedRange];
  };
  public type GetTransactionsResponse = {
    first_index : Nat;
    log_length : Nat;
    transactions : [Transaction];
    archived_transactions : [ArchivedRange_1];
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
    archive_options : ArchiveOptions;
    max_memo_length : ?Nat16;
    token_name : Text;
    feature_flags : ?FeatureFlags;
  };
  public type LedgerArgument = { #Upgrade : ?UpgradeArgs; #Init : InitArgs };
  public type MetadataValue = {
    #Int : Int;
    #Nat : Nat;
    #Blob : Blob;
    #Text : Text;
  };
  public type Mint = {
    to : Account;
    memo : ?Blob;
    created_at_time : ?Nat64;
    amount : Nat;
  };
  public type Result = { #Ok : Nat; #Err : TransferError };
  public type Result_1 = { #Ok : Nat; #Err : ApproveError };
  public type Result_2 = { #Ok : Nat; #Err : TransferFromError };
  public type StandardRecord = { url : Text; name : Text };
  public type Transaction = {
    burn : ?Burn;
    kind : Text;
    mint : ?Mint;
    approve : ?Approve;
    timestamp : Nat64;
    transfer : ?Transfer;
  };
  public type TransactionRange = { transactions : [Transaction] };
  public type Transfer = {
    to : Account;
    fee : ?Nat;
    from : Account;
    memo : ?Blob;
    created_at_time : ?Nat64;
    amount : Nat;
    spender : ?Account;
  };
  public type TransferArg = {
    to : Account;
    fee : ?Nat;
    memo : ?Blob;
    from_subaccount : ?Blob;
    created_at_time : ?Nat64;
    amount : Nat;
  };
  public type TransferError = {
    #GenericError : { message : Text; error_code : Nat };
    #TemporarilyUnavailable;
    #BadBurn : { min_burn_amount : Nat };
    #Duplicate : { duplicate_of : Nat };
    #BadFee : { expected_fee : Nat };
    #CreatedInFuture : { ledger_time : Nat64 };
    #TooOld;
    #InsufficientFunds : { balance : Nat };
  };
  public type TransferFromArgs = {
    to : Account;
    fee : ?Nat;
    spender_subaccount : ?Blob;
    from : Account;
    memo : ?Blob;
    created_at_time : ?Nat64;
    amount : Nat;
  };
  public type TransferFromError = {
    #GenericError : { message : Text; error_code : Nat };
    #TemporarilyUnavailable;
    #InsufficientAllowance : { allowance : Nat };
    #BadBurn : { min_burn_amount : Nat };
    #Duplicate : { duplicate_of : Nat };
    #BadFee : { expected_fee : Nat };
    #CreatedInFuture : { ledger_time : Nat64 };
    #TooOld;
    #InsufficientFunds : { balance : Nat };
  };
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
  public type Value = {
    #Int : Int;
    #Map : [(Text, Value)];
    #Nat : Nat;
    #Nat64 : Nat64;
    #Blob : Blob;
    #Text : Text;
    #Array : Vec;
  };
  public type Vec = [
    {
      #Int : Int;
      #Map : [(Text, Value)];
      #Nat : Nat;
      #Nat64 : Nat64;
      #Blob : Blob;
      #Text : Text;
      #Array : Vec;
    }
  ];
  public type Self = actor {
    get_blocks : shared query GetBlocksRequest -> async GetBlocksResponse;
    get_data_certificate : shared query () -> async DataCertificate;
    get_transactions : shared query GetBlocksRequest -> async GetTransactionsResponse;
    icrc1_balance_of : shared query Account -> async Nat;
    icrc1_decimals : shared query () -> async Nat8;
    icrc1_fee : shared query () -> async Nat;
    icrc1_metadata : shared query () -> async [(Text, MetadataValue)];
    icrc1_minting_account : shared query () -> async ?Account;
    icrc1_name : shared query () -> async Text;
    icrc1_supported_standards : shared query () -> async [StandardRecord];
    icrc1_symbol : shared query () -> async Text;
    icrc1_total_supply : shared query () -> async Nat;
    icrc1_transfer : shared TransferArg -> async Result;
    icrc2_allowance : shared query AllowanceArgs -> async Allowance;
    icrc2_approve : shared ApproveArgs -> async Result_1;
    icrc2_transfer_from : shared TransferFromArgs -> async Result_2;
  }
}