module TokensTable {
    public let TokenTableAttributes = [
        {
            name = "creator_pid";
            dataType = #principal;
            unique = false;
            required = true;
            defaultValue = #default;
        },
        {
            name = "name";
            dataType = #text;
            unique = true;
            required = true;
            defaultValue = #default;
        },
        {
            name = "symbol";
            dataType = #text;
            unique = true;
            required = true;
            defaultValue = #default;
        },
        {
            name = "core_traits";
            dataType = #text;
            unique = false;
            required = true;
            defaultValue = #default;
        },
        {
            name = "logo_url";
            dataType = #text;
            unique = true;
            required = true;
            defaultValue = #default;
        },
        {
            name = "initial_supply";
            dataType = #nat;
            unique = false;
            required = true;
            defaultValue = #default;
        },
        {
            name = "initial_fee";
            dataType = #nat;
            unique = false;
            required = true;
            defaultValue = #default;
        },
        {
            name = "canister_id";
            dataType = #text;
            unique = true;
            required = true;
            defaultValue = #default;
        },
        {
            name = "index_canister_id";
            dataType = #text;
            unique = true;
            required = true;
            defaultValue = #default;
        },
        {
            name = "bits_evaporated";
            dataType = #float;
            unique = false;
            required = true;
            defaultValue = #default;
        },
        {
            name = "token_created_at";
            dataType = #nat64;
            unique = false;
            required = true;
            defaultValue = #default;
        },
    ];
    public let TokenTableIndexes = [{
        name = "principal_id_index";
        nonUnique = true;
        attributeName = "creator_pid";
    }];
};
