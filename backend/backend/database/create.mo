import AlfangoDB "mo:alfangodb/AlfangoDB";

import TokensTable "../tables/tokens";
import TransferTable "../tables/transfers";
import Constants "../utils/constants";

module DbCreate {
    public class Create(alfangoDB : AlfangoDB.AlfangoDB) {
        public func initialize() : async Text {

            let _res = await AlfangoDB.updateOperation({
                updateOpsInput = #CreateDatabaseInput({
                    name = Constants.BreakingBitsDatabase;
                });
                alfangoDB;
            });

            let _res1 = await AlfangoDB.updateOperation({
                updateOpsInput = #CreateTableInput({
                    databaseName = Constants.BreakingBitsDatabase;
                    name = Constants.TokenTable;
                    attributes = TokensTable.TokenTableAttributes;
                    indexes = TokensTable.TokenTableIndexes;
                });
                alfangoDB;
            });

            let _res2 = await AlfangoDB.updateOperation({
                updateOpsInput = #CreateTableInput({
                    databaseName = Constants.BreakingBitsDatabase;
                    name = Constants.TransfersTable;
                    attributes = TransferTable.TransferTableAttributes;
                    indexes = TransferTable.TransferTableIndexes;
                });
                alfangoDB;
            });

            let _addAttributesToTokenTable = addAttributesToTokenTable(alfangoDB);

            return "All tables created successfully";
        };
    };

    public func addAttributesToTokenTable(databases : AlfangoDB.AlfangoDB) : Text {

        let attributes = [
            {
                name = "core_traits";
                datatype = #text;
                unique = false;
                required = true;
            },
        ];

        for (attribute in attributes.vals()) {
            let _item = AlfangoDB.addAttribute({
                addAttributeInput = {
                    databaseName = Constants.BreakingBitsDatabase;
                    tableName = Constants.TokenTable;
                    attribute = {
                        name = attribute.name;
                        dataType = attribute.datatype;
                        unique = attribute.unique;
                        required = attribute.required;
                        defaultValue = #default;
                    };
                };
                alfangoDB = databases;
            });

        };
        return "All attributes added successfully";
    };

};
