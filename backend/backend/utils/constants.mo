import Float "mo:base/Float";

module Constants {

    public let IsLocal = false;

    public let e8s : Float = 100_000_000;
    public let IcpFee = 10000;
    public let BitsFee = 1483370;
    public let CyclesLimit = 3_000_000_000_000;

    public let BackendCanisterId = "prdxk-aqaaa-aaaai-qpfta-cai";
    public let IcpLedgerCanister = "ryjl3-tyaaa-aaaaa-aaaba-cai";
    public let BitsCanister = "j5lhj-xyaaa-aaaai-qpfeq-cai";

    public let BreakingBitsDatabase = "bitwizard_db";
    public let TokenTable = "tokens";
    public let TransfersTable = "transfers";

    public let SagarICPTransferPrincipal = "eutvf-g6bsi-qh2wf-fqb36-jf5cp-cogzu-clao4-l6anb-govub-e4uza-lae";

    public let SagarControllerPrincipal = "ui2e3-bjedh-zjjlk-tr242-ia6te-4ir66-akdvx-fha66-gbcuj-a6q62-kqe";

    // public let BlackholeCanister = "e3mmv-5qaaa-aaaah-aadma-cai";
    public let BlackholeCanister = SagarControllerPrincipal;

    public let NisargPrincipal = "chw5b-zpfm7-v2twr-f7kp3-ezp3b-icoh3-x22fp-ajsdf-vkfxo-quboc-3qe";

    public let DaivikPrincipal = "35746-jxry4-ec5mx-fcpgj-h7ysb-gmzeq-ttm4d-aq6td-ozyvu-3owrr-gae";

    public let BreakingBitsICPTransferPrincipal = SagarICPTransferPrincipal;

    public let ExeICPTransferPrincipal = SagarICPTransferPrincipal;

    public let MintingAccountController = "x75xh-fwg4u-ggq2v-g6oit-k6uif-eqb2e-d7xgb-lfnlz-z5jxb-rlmb4-zae";

    public let BitsLedgerPrincipal = "rc4zm-gdz44-x55iz-w2nkq-ugrl2-ltvxs-yetvq-7xbyk-ur4dv-inept-tqe";

    public let AnonymousPrincipal = "2vxsx-fae";

    public let WhitelistedPrincipals = [
        NisargPrincipal,
        DaivikPrincipal,
        SagarICPTransferPrincipal,
        SagarControllerPrincipal,
        AnonymousPrincipal,
    ];

};
