import AlfangoDB "mo:alfangodb/AlfangoDB";
import Array "mo:base/Array";
import Float "mo:base/Float";
import Nat64 "mo:base/Nat64";
import Prelude "mo:base/Prelude";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import D3 "mo:d3storage/D3";

import DbCreate "database/create";
import DbRead "database/read";
import DbUpdate "database/update";
import Storage "services/fileStorage";
import Transfers "services/transfers";
import Xrc "services/xrc";
import Token "token/token";
import Input "types/input";
import Output "types/output";
import Constants "utils/constants";

shared ({ caller = initializer }) actor class Backend() = this {
  stable let alfangoDB = AlfangoDB.AlfangoDB();
  stable let d3 = D3.D3();
  stable var totalBurnedBits : Float = 0;
  stable var totalBurnedExe : Float = 0;
  let storageService = Storage.D3Service(d3);
  let xrcService = Xrc.XRCService();
  let dbCreate = DbCreate.Create(alfangoDB);
  let dbRead = DbRead.Read(alfangoDB);
  let dbUpdate = DbUpdate.Update(alfangoDB);
  let transferService = Transfers.transfers(dbUpdate);
  let tokenService = Token.Token(dbUpdate, transferService);

  //initialize database
  private func _initialize_db() : async Text {
    await dbCreate.initialize();
  };

  // returns equivalent amount of USD in ICP
  public shared (msg) func usd_to_icp(usd : Float) : async Nat {
    isCallerAuthenticated(msg.caller);
    let exchangeRate = await xrcService.getExchangeRate("ICP", "USD");
    let icp_amt : Nat = Nat64.toNat(Nat64.fromIntWrap(Float.toInt((usd / exchangeRate) * (Constants.e8s))));
    return icp_amt;
  };

  // to get the total bits evaporated
  public query (msg) func get_total_bits_evaporated() : async Float {
    isCallerAuthenticated(msg.caller);
    return totalBurnedBits;
  };

  public query (msg) func get_burned_tokens() : async Output.BurnedTokenOutput {
    isCallerAuthenticated(msg.caller);
    {
      burned_bits = totalBurnedBits;
      burned_exe = totalBurnedExe;
    };
  };

  public query func get_burned_tokens_test(pid : Text) : async Output.BurnedTokenOutput {
    isCallerAuthenticated(Principal.fromText(pid));
    {
      burned_bits = totalBurnedBits;
      burned_exe = totalBurnedExe;
    };
  };

  public query func get_total_bits_evaporated_test(pid : Text) : async Float {
    isCallerAuthenticated(Principal.fromText(pid));
    return totalBurnedBits;
  };

  // File upload
  public shared (msg) func uploadImage(args : Input.UploadFile) : async Output.uploadFile {
    isCallerAuthenticated(msg.caller);
    let fileUrl = await storageService.uploadFile(args);
    return fileUrl;
  };

  public shared ({ caller }) func create_token(args : Input.CreateToken) : async Result.Result<Text, [Text]> {
    if (Principal.isAnonymous(caller)) {
      return #err(["Anonymous user cannot create token"]);
    };
    let res = await tokenService.initialize_token_canister(caller, args);
    //update total burned bits
    let burned_bits = transferService.get_burned_bits();
    totalBurnedBits += burned_bits;

    let burned_exe = transferService.get_burned_exe();
    totalBurnedExe += burned_exe;
    return res;
  };

  public query (msg) func get_user_tokens() : async Output.GetTokensByPidOutput {
    isCallerAuthenticated(msg.caller);
    let args : Input.GetTokensByPid = { pid = msg.caller };
    return dbRead.get_tokens_by_pid(args);
  };

  public query func get_user_tokens_test(pid : Text) : async Output.GetTokensByPidOutput {
    isCallerAuthenticated(Principal.fromText(pid));
    let args : Input.GetTokensByPid = { pid = Principal.fromText(pid) };
    return dbRead.get_tokens_by_pid(args);
  };

  public query (msg) func is_unique_token_name(name : Text) : async Bool {
    isCallerAuthenticated(msg.caller);
    return dbRead.unique_name(name);
  };

  public query (msg) func is_unique_token_symbol(symbol : Text) : async Bool {
    isCallerAuthenticated(msg.caller);
    return dbRead.unique_symbol(symbol);
  };

  // D3 methods
  public query func http_request(httpRequest : D3.HttpRequest) : async D3.HttpResponse {
    D3.getFileHTTP({ d3; httpRequest; httpStreamingCallbackActor = this });
  };

  public query func http_request_streaming_callback(streamingCallbackToken : D3.StreamingCallbackToken) : async D3.StreamingCallbackHttpResponse {
    D3.httpStreamingCallback({ d3; streamingCallbackToken });
  };

  public shared (msg) func updateOperation({
    updateOpsInput : AlfangoDB.UpdateOpsInputType;
  }) : async AlfangoDB.UpdateOpsOutputType {
    if (not isCallerWhitelisted(msg.caller)) Prelude.unreachable();
    return await AlfangoDB.updateOperation({
      updateOpsInput;
      alfangoDB;
    });
  };

  public query (msg) func queryOperation({
    queryOpsInput : AlfangoDB.QueryOpsInputType;
  }) : async AlfangoDB.QueryOpsOutputType {
    if (not isCallerWhitelisted(msg.caller)) Prelude.unreachable();
    return AlfangoDB.queryOperation({ queryOpsInput; alfangoDB });
  };

  private func isCallerAuthenticated(caller : Principal) {
    if (Principal.isAnonymous(caller)) Prelude.unreachable();
  };

  private func isCallerWhitelisted(caller : Principal) : Bool {
    let found = Array.find<Text>(Constants.WhitelistedPrincipals, func(p : Text) : Bool { p == Principal.toText(caller) });
    switch (found) {
      case null { return false };
      case _ { return true };
    };
  };

};
