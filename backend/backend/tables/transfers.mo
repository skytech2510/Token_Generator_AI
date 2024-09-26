module TransferTable {
    public let TransferTableAttributes = [
        {
            name = "sender_pid";
            dataType = #principal;
            unique = false;
            required = true;
            defaultValue = #default;
        },
        {
            name = "token_id";
            dataType = #text;
            unique = true;
            required = true;
            defaultValue = #default;
        },
        {
            name = "burned_bits";
            dataType = #float;
            unique = false;
            required = true;
            defaultValue = #default;
        },
        {
            name = "to_sagar";
            dataType = #float;
            unique = false;
            required = true;
            defaultValue = #default;
        },
        {
            name = "to_breaking_bits";
            dataType = #float;
            unique = false;
            required = true;
            defaultValue = #default;
        },
        {
            name = "to_exe";
            dataType = #float;
            unique = false;
            required = true;
            defaultValue = #default;
        },
    ];
    public let TransferTableIndexes = [
        {
            name = "principal_id_index";
            nonUnique = true;
            attributeName = "sender_pid";
        },
    ];
};
