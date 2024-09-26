export const idlFactory = ({ IDL }) => {
  const MetadataValue = IDL.Variant({
    Int: IDL.Int,
    Nat: IDL.Nat,
    Blob: IDL.Vec(IDL.Nat8),
    Text: IDL.Text,
  });
  const Subaccount = IDL.Vec(IDL.Nat8);
  const Account = IDL.Record({
    owner: IDL.Principal,
    subaccount: IDL.Opt(Subaccount),
  });
  const CreateToken = IDL.Record({
    token_symbol: IDL.Text,
    transfer_fee: IDL.Nat,
    metadata: IDL.Vec(IDL.Tuple(IDL.Text, MetadataValue)),
    is_blackholed: IDL.Bool,
    initial_balances: IDL.Vec(IDL.Tuple(Account, IDL.Nat)),
    token_core_traits: IDL.Text,
    icp_amount: IDL.Nat,
    token_name: IDL.Text,
  });
  const Result = IDL.Variant({ ok: IDL.Text, err: IDL.Vec(IDL.Text) });
  const BurnedTokenOutput = IDL.Record({
    burned_bits: IDL.Float64,
    burned_exe: IDL.Float64,
  });
  const GetTokensByPid = IDL.Record({
    bits_evaporated: IDL.Float64,
    initial_supply: IDL.Nat,
    initial_fee: IDL.Nat,
    token_created_at: IDL.Nat64,
    name: IDL.Text,
    canister_id: IDL.Text,
    core_traits: IDL.Text,
    creator_pid: IDL.Principal,
    logo_url: IDL.Text,
    index_canister_id: IDL.Text,
    symbol: IDL.Text,
  });
  const GetTokensByPidOutput = IDL.Variant({
    ok: IDL.Vec(GetTokensByPid),
    err: IDL.Vec(IDL.Text),
  });
  const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
  const HttpRequest = IDL.Record({
    url: IDL.Text,
    method: IDL.Text,
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HeaderField),
    certificate_version: IDL.Opt(IDL.Nat16),
  });
  const StreamingCallbackToken__1 = IDL.Record({
    file_size: IDL.Nat64,
    index: IDL.Nat64,
    chunk_size: IDL.Nat64,
    file_id: IDL.Text,
  });
  const StreamingCallbackHttpResponse__1 = IDL.Record({
    token: IDL.Opt(StreamingCallbackToken__1),
    body: IDL.Vec(IDL.Nat8),
  });
  const StreamingCallback = IDL.Func(
    [StreamingCallbackToken__1],
    [StreamingCallbackHttpResponse__1],
    ["query"]
  );
  const StreamingStrategy = IDL.Variant({
    Callback: IDL.Record({
      token: StreamingCallbackToken__1,
      callback: StreamingCallback,
    }),
  });
  const HttpResponse = IDL.Record({
    body: IDL.Vec(IDL.Nat8),
    headers: IDL.Vec(HeaderField),
    streaming_strategy: IDL.Opt(StreamingStrategy),
    status_code: IDL.Nat16,
  });
  const StreamingCallbackToken = IDL.Record({
    file_size: IDL.Nat64,
    index: IDL.Nat64,
    chunk_size: IDL.Nat64,
    file_id: IDL.Text,
  });
  const StreamingCallbackHttpResponse = IDL.Record({
    token: IDL.Opt(StreamingCallbackToken__1),
    body: IDL.Vec(IDL.Nat8),
  });
  const RelationalExpressionAttributeDataValue = IDL.Variant({
    int: IDL.Int,
    nat: IDL.Nat,
    float: IDL.Float64,
    principal: IDL.Principal,
    blob: IDL.Vec(IDL.Nat8),
    bool: IDL.Bool,
    char: IDL.Nat32,
    int8: IDL.Int8,
    nat8: IDL.Nat8,
    text: IDL.Text,
    nat16: IDL.Nat16,
    nat32: IDL.Nat32,
    nat64: IDL.Nat64,
    int16: IDL.Int16,
    int32: IDL.Int32,
    int64: IDL.Int64,
  });
  const StringAttributeDataValue = IDL.Variant({
    char: IDL.Nat32,
    text: IDL.Text,
  });
  const FilterExpressionConditionType = IDL.Variant({
    EQ: RelationalExpressionAttributeDataValue,
    GT: RelationalExpressionAttributeDataValue,
    IN: IDL.Vec(RelationalExpressionAttributeDataValue),
    LT: RelationalExpressionAttributeDataValue,
    GTE: RelationalExpressionAttributeDataValue,
    LTE: RelationalExpressionAttributeDataValue,
    NEQ: RelationalExpressionAttributeDataValue,
    NOT_EXISTS: IDL.Null,
    EXISTS: IDL.Null,
    CONTAINS: StringAttributeDataValue,
    BEGINS_WITH: StringAttributeDataValue,
    NOT_CONTAINS: StringAttributeDataValue,
    BETWEEN: IDL.Tuple(
      RelationalExpressionAttributeDataValue,
      RelationalExpressionAttributeDataValue
    ),
    NOT_BETWEEN: IDL.Tuple(
      RelationalExpressionAttributeDataValue,
      RelationalExpressionAttributeDataValue
    ),
  });
  const FilterExpressionType = IDL.Record({
    filterExpressionCondition: FilterExpressionConditionType,
    attributeName: IDL.Text,
  });
  const PaginatedScanInputType = IDL.Record({
    filterExpressions: IDL.Vec(FilterExpressionType),
    offset: IDL.Nat,
    limit: IDL.Nat,
    databaseName: IDL.Text,
    tableName: IDL.Text,
  });
  const GetItemByIdInputType = IDL.Record({
    id: IDL.Text,
    databaseName: IDL.Text,
    tableName: IDL.Text,
  });
  const GetTableMetadataInputType = IDL.Record({
    databaseName: IDL.Text,
    tableName: IDL.Text,
  });
  const ScanAndGetIdsInputType = IDL.Record({
    filterExpressions: IDL.Vec(FilterExpressionType),
    databaseName: IDL.Text,
    tableName: IDL.Text,
  });
  const BatchGetItemByIdInputType = IDL.Record({
    ids: IDL.Vec(IDL.Text),
    databaseName: IDL.Text,
    tableName: IDL.Text,
  });
  const ScanInputType = IDL.Record({
    filterExpressions: IDL.Vec(FilterExpressionType),
    databaseName: IDL.Text,
    tableName: IDL.Text,
  });
  const GetItemCountInputType = IDL.Record({
    databaseName: IDL.Text,
    tableName: IDL.Text,
  });
  const QueryOpsInputType = IDL.Variant({
    PaginatedScanInput: PaginatedScanInputType,
    GetItemByIdInput: GetItemByIdInputType,
    GetTableMetadataInput: GetTableMetadataInputType,
    ScanAndGetIdsInput: ScanAndGetIdsInputType,
    BatchGetItemByIdInput: BatchGetItemByIdInputType,
    ScanInput: ScanInputType,
    GetItemCountInput: GetItemCountInputType,
  });
  const AttributeName = IDL.Text;
  const AttributeDataType = IDL.Variant({
    int: IDL.Null,
    map: IDL.Null,
    nat: IDL.Null,
    float: IDL.Null,
    principal: IDL.Null,
    blob: IDL.Null,
    bool: IDL.Null,
    char: IDL.Null,
    int8: IDL.Null,
    list: IDL.Null,
    nat8: IDL.Null,
    text: IDL.Null,
    nat16: IDL.Null,
    nat32: IDL.Null,
    nat64: IDL.Null,
    default: IDL.Null,
    int16: IDL.Null,
    int32: IDL.Null,
    int64: IDL.Null,
  });
  const AttributeDataValue = IDL.Variant({
    int: IDL.Int,
    map: IDL.Vec(
      IDL.Tuple(
        IDL.Text,
        IDL.Variant({
          int: IDL.Int,
          nat: IDL.Nat,
          float: IDL.Float64,
          char: IDL.Nat32,
          int8: IDL.Int8,
          list: IDL.Vec(
            IDL.Variant({
              int: IDL.Int,
              nat: IDL.Nat,
              float: IDL.Float64,
              char: IDL.Nat32,
              int8: IDL.Int8,
              nat8: IDL.Nat8,
              text: IDL.Text,
              nat16: IDL.Nat16,
              nat32: IDL.Nat32,
              nat64: IDL.Nat64,
              int16: IDL.Int16,
              int32: IDL.Int32,
              int64: IDL.Int64,
            })
          ),
          nat8: IDL.Nat8,
          text: IDL.Text,
          nat16: IDL.Nat16,
          nat32: IDL.Nat32,
          nat64: IDL.Nat64,
          int16: IDL.Int16,
          int32: IDL.Int32,
          int64: IDL.Int64,
        })
      )
    ),
    nat: IDL.Nat,
    float: IDL.Float64,
    principal: IDL.Principal,
    blob: IDL.Vec(IDL.Nat8),
    bool: IDL.Bool,
    char: IDL.Nat32,
    int8: IDL.Int8,
    list: IDL.Vec(
      IDL.Variant({
        int: IDL.Int,
        nat: IDL.Nat,
        float: IDL.Float64,
        char: IDL.Nat32,
        int8: IDL.Int8,
        nat8: IDL.Nat8,
        text: IDL.Text,
        nat16: IDL.Nat16,
        nat32: IDL.Nat32,
        nat64: IDL.Nat64,
        int16: IDL.Int16,
        int32: IDL.Int32,
        int64: IDL.Int64,
      })
    ),
    nat8: IDL.Nat8,
    text: IDL.Text,
    nat16: IDL.Nat16,
    nat32: IDL.Nat32,
    nat64: IDL.Nat64,
    default: IDL.Null,
    int16: IDL.Int16,
    int32: IDL.Int32,
    int64: IDL.Int64,
  });
  const AttributeMetadata = IDL.Record({
    name: AttributeName,
    unique: IDL.Bool,
    dataType: AttributeDataType,
    required: IDL.Bool,
    defaultValue: AttributeDataValue,
  });
  const IndexName = IDL.Text;
  const TableIndexMetadata = IDL.Record({
    name: IndexName,
    attributeName: AttributeName,
  });
  const TableMetadataOutputType = IDL.Record({
    attributes: IDL.Vec(AttributeMetadata),
    indexes: IDL.Vec(TableIndexMetadata),
  });
  const GetTableMetadataOutputType = IDL.Opt(
    IDL.Record({
      metadata: TableMetadataOutputType,
      databaseName: IDL.Text,
      tableName: IDL.Text,
    })
  );
  const AttributeDataValue__1 = IDL.Variant({
    int: IDL.Int,
    map: IDL.Vec(
      IDL.Tuple(
        IDL.Text,
        IDL.Variant({
          int: IDL.Int,
          nat: IDL.Nat,
          float: IDL.Float64,
          char: IDL.Nat32,
          int8: IDL.Int8,
          list: IDL.Vec(
            IDL.Variant({
              int: IDL.Int,
              nat: IDL.Nat,
              float: IDL.Float64,
              char: IDL.Nat32,
              int8: IDL.Int8,
              nat8: IDL.Nat8,
              text: IDL.Text,
              nat16: IDL.Nat16,
              nat32: IDL.Nat32,
              nat64: IDL.Nat64,
              int16: IDL.Int16,
              int32: IDL.Int32,
              int64: IDL.Int64,
            })
          ),
          nat8: IDL.Nat8,
          text: IDL.Text,
          nat16: IDL.Nat16,
          nat32: IDL.Nat32,
          nat64: IDL.Nat64,
          int16: IDL.Int16,
          int32: IDL.Int32,
          int64: IDL.Int64,
        })
      )
    ),
    nat: IDL.Nat,
    float: IDL.Float64,
    principal: IDL.Principal,
    blob: IDL.Vec(IDL.Nat8),
    bool: IDL.Bool,
    char: IDL.Nat32,
    int8: IDL.Int8,
    list: IDL.Vec(
      IDL.Variant({
        int: IDL.Int,
        nat: IDL.Nat,
        float: IDL.Float64,
        char: IDL.Nat32,
        int8: IDL.Int8,
        nat8: IDL.Nat8,
        text: IDL.Text,
        nat16: IDL.Nat16,
        nat32: IDL.Nat32,
        nat64: IDL.Nat64,
        int16: IDL.Int16,
        int32: IDL.Int32,
        int64: IDL.Int64,
      })
    ),
    nat8: IDL.Nat8,
    text: IDL.Text,
    nat16: IDL.Nat16,
    nat32: IDL.Nat32,
    nat64: IDL.Nat64,
    default: IDL.Null,
    int16: IDL.Int16,
    int32: IDL.Int32,
    int64: IDL.Int64,
  });
  const PaginatedScanOutputType = IDL.Variant({
    ok: IDL.Record({
      offset: IDL.Nat,
      limit: IDL.Nat,
      nonScannedItemCount: IDL.Int,
      items: IDL.Vec(
        IDL.Record({
          id: IDL.Text,
          item: IDL.Vec(IDL.Tuple(IDL.Text, AttributeDataValue__1)),
        })
      ),
      scannedItemCount: IDL.Int,
    }),
    err: IDL.Vec(IDL.Text),
  });
  const ScanAndGetIdsOutputType = IDL.Variant({
    ok: IDL.Record({ ids: IDL.Vec(IDL.Text) }),
    err: IDL.Vec(IDL.Text),
  });
  const GetItemCountOutputType = IDL.Variant({
    ok: IDL.Record({ count: IDL.Int }),
    err: IDL.Vec(IDL.Text),
  });
  const ItemOutputType = IDL.Record({
    id: IDL.Text,
    item: IDL.Vec(IDL.Tuple(IDL.Text, AttributeDataValue__1)),
  });
  const GetItemByIdOutputType = IDL.Variant({
    ok: ItemOutputType,
    err: IDL.Vec(IDL.Text),
  });
  const BatchGetItemByIdOutputType = IDL.Variant({
    ok: IDL.Record({
      notFoundIds: IDL.Vec(IDL.Text),
      items: IDL.Vec(ItemOutputType),
    }),
    err: IDL.Vec(IDL.Text),
  });
  const ScanOutputType = IDL.Variant({
    ok: IDL.Vec(
      IDL.Record({
        id: IDL.Text,
        item: IDL.Vec(IDL.Tuple(IDL.Text, AttributeDataValue__1)),
      })
    ),
    err: IDL.Vec(IDL.Text),
  });
  const QueryOpsOutputType = IDL.Variant({
    GetTableMetadataOutput: GetTableMetadataOutputType,
    PaginatedScanOutput: PaginatedScanOutputType,
    ScanAndGetIdsOutput: ScanAndGetIdsOutputType,
    GetItemCountOutput: GetItemCountOutputType,
    GetItemByIdOutput: GetItemByIdOutputType,
    BatchGetItemByIdOutput: BatchGetItemByIdOutputType,
    ScanOutput: ScanOutputType,
  });
  const DropAttributeInputType = IDL.Record({
    attributeName: IDL.Text,
    databaseName: IDL.Text,
    tableName: IDL.Text,
  });
  const UpdateItemInputType = IDL.Record({
    id: IDL.Text,
    databaseName: IDL.Text,
    attributeDataValues: IDL.Vec(IDL.Tuple(IDL.Text, AttributeDataValue__1)),
    tableName: IDL.Text,
  });
  const CreateDatabaseInputType = IDL.Record({ name: IDL.Text });
  const CreateTableInputType = IDL.Record({
    name: IDL.Text,
    databaseName: IDL.Text,
    attributes: IDL.Vec(AttributeMetadata),
    indexes: IDL.Vec(TableIndexMetadata),
  });
  const CreateItemInputType = IDL.Record({
    databaseName: IDL.Text,
    attributeDataValues: IDL.Vec(IDL.Tuple(IDL.Text, AttributeDataValue__1)),
    tableName: IDL.Text,
  });
  const AddAttributeInputType = IDL.Record({
    databaseName: IDL.Text,
    tableName: IDL.Text,
    attribute: AttributeMetadata,
  });
  const UpdateOpsInputType = IDL.Variant({
    DropAttributeInput: DropAttributeInputType,
    UpdateItemInput: UpdateItemInputType,
    CreateDatabaseInput: CreateDatabaseInputType,
    CreateTableInput: CreateTableInputType,
    CreateItemInput: CreateItemInputType,
    AddAttributeInput: AddAttributeInputType,
  });
  const AddAttributeOutputType = IDL.Variant({
    ok: IDL.Record({
      attributeName: IDL.Text,
      databaseName: IDL.Text,
      tableName: IDL.Text,
    }),
    err: IDL.Vec(IDL.Text),
  });
  const CreateItemOutputType = IDL.Variant({
    ok: IDL.Record({
      id: IDL.Text,
      item: IDL.Vec(IDL.Tuple(IDL.Text, AttributeDataValue__1)),
    }),
    err: IDL.Vec(IDL.Text),
  });
  const UpdateItemOutputType = IDL.Variant({
    ok: IDL.Record({
      id: IDL.Text,
      item: IDL.Vec(IDL.Tuple(IDL.Text, AttributeDataValue__1)),
    }),
    err: IDL.Vec(IDL.Text),
  });
  const CreateDatabaseOutputType = IDL.Variant({
    ok: IDL.Record({}),
    err: IDL.Vec(IDL.Text),
  });
  const CreateTableOutputType = IDL.Variant({
    ok: IDL.Record({}),
    err: IDL.Vec(IDL.Text),
  });
  const DropAttributeOutputType = IDL.Variant({
    ok: IDL.Record({
      attributeName: IDL.Text,
      databaseName: IDL.Text,
      tableName: IDL.Text,
    }),
    err: IDL.Vec(IDL.Text),
  });
  const UpdateOpsOutputType = IDL.Variant({
    AddAttributeOutput: AddAttributeOutputType,
    CreateItemOutput: CreateItemOutputType,
    UpdateItemOutput: UpdateItemOutputType,
    CreateDatabaseOutput: CreateDatabaseOutputType,
    CreateTableOutput: CreateTableOutputType,
    DropAttributeOutput: DropAttributeOutputType,
  });
  const UploadFile = IDL.Record({
    fileBlob: IDL.Vec(IDL.Nat8),
    fileName: IDL.Text,
    fileType: IDL.Text,
  });
  const uploadFile = IDL.Text;
  return IDL.Service({
    create_token: IDL.Func([CreateToken], [Result], []),
    get_burned_tokens: IDL.Func([], [BurnedTokenOutput], ["query"]),
    get_burned_tokens_test: IDL.Func(
      [IDL.Text],
      [BurnedTokenOutput],
      ["query"]
    ),
    get_total_bits_evaporated: IDL.Func([], [IDL.Float64], ["query"]),
    get_total_bits_evaporated_test: IDL.Func(
      [IDL.Text],
      [IDL.Float64],
      ["query"]
    ),
    get_user_tokens: IDL.Func([], [GetTokensByPidOutput], ["query"]),
    get_user_tokens_test: IDL.Func(
      [IDL.Text],
      [GetTokensByPidOutput],
      ["query"]
    ),
    http_request: IDL.Func([HttpRequest], [HttpResponse], ["query"]),
    http_request_streaming_callback: IDL.Func(
      [StreamingCallbackToken],
      [StreamingCallbackHttpResponse],
      ["query"]
    ),
    is_unique_token_name: IDL.Func([IDL.Text], [IDL.Bool], ["query"]),
    is_unique_token_symbol: IDL.Func([IDL.Text], [IDL.Bool], ["query"]),
    queryOperation: IDL.Func(
      [IDL.Record({ queryOpsInput: QueryOpsInputType })],
      [QueryOpsOutputType],
      ["query"]
    ),
    updateOperation: IDL.Func(
      [IDL.Record({ updateOpsInput: UpdateOpsInputType })],
      [UpdateOpsOutputType],
      []
    ),
    uploadImage: IDL.Func([UploadFile], [uploadFile], []),
    usd_to_icp: IDL.Func([IDL.Float64], [IDL.Nat], []),
  });
};
export const init = ({ IDL }) => {
  return [];
};
