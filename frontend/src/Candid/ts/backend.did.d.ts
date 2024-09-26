import type { ActorMethod } from "@dfinity/agent";
import type { IDL } from "@dfinity/candid";
import type { Principal } from "@dfinity/principal";

export interface Account {
  owner: Principal;
  subaccount: [] | [Subaccount];
}
export interface AddAttributeInputType {
  databaseName: string;
  tableName: string;
  attribute: AttributeMetadata;
}
export type AddAttributeOutputType =
  | {
      ok: {
        attributeName: string;
        databaseName: string;
        tableName: string;
      };
    }
  | { err: Array<string> };
export type AttributeDataType =
  | { int: null }
  | { map: null }
  | { nat: null }
  | { float: null }
  | { principal: null }
  | { blob: null }
  | { bool: null }
  | { char: null }
  | { int8: null }
  | { list: null }
  | { nat8: null }
  | { text: null }
  | { nat16: null }
  | { nat32: null }
  | { nat64: null }
  | { default: null }
  | { int16: null }
  | { int32: null }
  | { int64: null };
export type AttributeDataValue =
  | { int: bigint }
  | {
      map: Array<
        [
          string,
          (
            | { int: bigint }
            | { nat: bigint }
            | { float: number }
            | { char: number }
            | { int8: number }
            | {
                list: Array<
                  | { int: bigint }
                  | { nat: bigint }
                  | { float: number }
                  | { char: number }
                  | { int8: number }
                  | { nat8: number }
                  | { text: string }
                  | { nat16: number }
                  | { nat32: number }
                  | { nat64: bigint }
                  | { int16: number }
                  | { int32: number }
                  | { int64: bigint }
                >;
              }
            | { nat8: number }
            | { text: string }
            | { nat16: number }
            | { nat32: number }
            | { nat64: bigint }
            | { int16: number }
            | { int32: number }
            | { int64: bigint }
          ),
        ]
      >;
    }
  | { nat: bigint }
  | { float: number }
  | { principal: Principal }
  | { blob: Uint8Array | number[] }
  | { bool: boolean }
  | { char: number }
  | { int8: number }
  | {
      list: Array<
        | { int: bigint }
        | { nat: bigint }
        | { float: number }
        | { char: number }
        | { int8: number }
        | { nat8: number }
        | { text: string }
        | { nat16: number }
        | { nat32: number }
        | { nat64: bigint }
        | { int16: number }
        | { int32: number }
        | { int64: bigint }
      >;
    }
  | { nat8: number }
  | { text: string }
  | { nat16: number }
  | { nat32: number }
  | { nat64: bigint }
  | { default: null }
  | { int16: number }
  | { int32: number }
  | { int64: bigint };
export type AttributeDataValue__1 =
  | { int: bigint }
  | {
      map: Array<
        [
          string,
          (
            | { int: bigint }
            | { nat: bigint }
            | { float: number }
            | { char: number }
            | { int8: number }
            | {
                list: Array<
                  | { int: bigint }
                  | { nat: bigint }
                  | { float: number }
                  | { char: number }
                  | { int8: number }
                  | { nat8: number }
                  | { text: string }
                  | { nat16: number }
                  | { nat32: number }
                  | { nat64: bigint }
                  | { int16: number }
                  | { int32: number }
                  | { int64: bigint }
                >;
              }
            | { nat8: number }
            | { text: string }
            | { nat16: number }
            | { nat32: number }
            | { nat64: bigint }
            | { int16: number }
            | { int32: number }
            | { int64: bigint }
          ),
        ]
      >;
    }
  | { nat: bigint }
  | { float: number }
  | { principal: Principal }
  | { blob: Uint8Array | number[] }
  | { bool: boolean }
  | { char: number }
  | { int8: number }
  | {
      list: Array<
        | { int: bigint }
        | { nat: bigint }
        | { float: number }
        | { char: number }
        | { int8: number }
        | { nat8: number }
        | { text: string }
        | { nat16: number }
        | { nat32: number }
        | { nat64: bigint }
        | { int16: number }
        | { int32: number }
        | { int64: bigint }
      >;
    }
  | { nat8: number }
  | { text: string }
  | { nat16: number }
  | { nat32: number }
  | { nat64: bigint }
  | { default: null }
  | { int16: number }
  | { int32: number }
  | { int64: bigint };
export interface AttributeMetadata {
  name: AttributeName;
  unique: boolean;
  dataType: AttributeDataType;
  required: boolean;
  defaultValue: AttributeDataValue;
}
export type AttributeName = string;
export interface BatchGetItemByIdInputType {
  ids: Array<string>;
  databaseName: string;
  tableName: string;
}
export type BatchGetItemByIdOutputType =
  | {
      ok: { notFoundIds: Array<string>; items: Array<ItemOutputType> };
    }
  | { err: Array<string> };
export interface BurnedTokenOutput {
  burned_bits: number;
  burned_exe: number;
}
export interface CreateDatabaseInputType {
  name: string;
}
export type CreateDatabaseOutputType = { ok: {} } | { err: Array<string> };
export interface CreateItemInputType {
  databaseName: string;
  attributeDataValues: Array<[string, AttributeDataValue__1]>;
  tableName: string;
}
export type CreateItemOutputType =
  | {
      ok: { id: string; item: Array<[string, AttributeDataValue__1]> };
    }
  | { err: Array<string> };
export interface CreateTableInputType {
  name: string;
  databaseName: string;
  attributes: Array<AttributeMetadata>;
  indexes: Array<TableIndexMetadata>;
}
export type CreateTableOutputType = { ok: {} } | { err: Array<string> };
export interface CreateToken {
  token_symbol: string;
  transfer_fee: bigint;
  metadata: Array<[string, MetadataValue]>;
  is_blackholed: boolean;
  initial_balances: Array<[Account, bigint]>;
  token_core_traits: string;
  icp_amount: bigint;
  token_name: string;
}
export interface DropAttributeInputType {
  attributeName: string;
  databaseName: string;
  tableName: string;
}
export type DropAttributeOutputType =
  | {
      ok: {
        attributeName: string;
        databaseName: string;
        tableName: string;
      };
    }
  | { err: Array<string> };
export type FilterExpressionConditionType =
  | {
      EQ: RelationalExpressionAttributeDataValue;
    }
  | { GT: RelationalExpressionAttributeDataValue }
  | { IN: Array<RelationalExpressionAttributeDataValue> }
  | { LT: RelationalExpressionAttributeDataValue }
  | { GTE: RelationalExpressionAttributeDataValue }
  | { LTE: RelationalExpressionAttributeDataValue }
  | { NEQ: RelationalExpressionAttributeDataValue }
  | { NOT_EXISTS: null }
  | { EXISTS: null }
  | { CONTAINS: StringAttributeDataValue }
  | { BEGINS_WITH: StringAttributeDataValue }
  | { NOT_CONTAINS: StringAttributeDataValue }
  | {
      BETWEEN: [
        RelationalExpressionAttributeDataValue,
        RelationalExpressionAttributeDataValue,
      ];
    }
  | {
      NOT_BETWEEN: [
        RelationalExpressionAttributeDataValue,
        RelationalExpressionAttributeDataValue,
      ];
    };
export interface FilterExpressionType {
  filterExpressionCondition: FilterExpressionConditionType;
  attributeName: string;
}
export interface GetItemByIdInputType {
  id: string;
  databaseName: string;
  tableName: string;
}
export type GetItemByIdOutputType =
  | { ok: ItemOutputType }
  | { err: Array<string> };
export interface GetItemCountInputType {
  databaseName: string;
  tableName: string;
}
export type GetItemCountOutputType =
  | { ok: { count: bigint } }
  | { err: Array<string> };
export interface GetTableMetadataInputType {
  databaseName: string;
  tableName: string;
}
export type GetTableMetadataOutputType =
  | []
  | [
      {
        metadata: TableMetadataOutputType;
        databaseName: string;
        tableName: string;
      },
    ];
export interface GetTokensByPid {
  bits_evaporated: number;
  initial_supply: bigint;
  initial_fee: bigint;
  token_created_at: bigint;
  name: string;
  canister_id: string;
  core_traits: string;
  creator_pid: Principal;
  logo_url: string;
  index_canister_id: string;
  symbol: string;
}
export type GetTokensByPidOutput =
  | { ok: Array<GetTokensByPid> }
  | { err: Array<string> };
export type HeaderField = [string, string];
export interface HttpRequest {
  url: string;
  method: string;
  body: Uint8Array | number[];
  headers: Array<HeaderField>;
  certificate_version: [] | [number];
}
export interface HttpResponse {
  body: Uint8Array | number[];
  headers: Array<HeaderField>;
  streaming_strategy: [] | [StreamingStrategy];
  status_code: number;
}
export type IndexName = string;
export interface ItemOutputType {
  id: string;
  item: Array<[string, AttributeDataValue__1]>;
}
export type MetadataValue =
  | { Int: bigint }
  | { Nat: bigint }
  | { Blob: Uint8Array | number[] }
  | { Text: string };
export interface PaginatedScanInputType {
  filterExpressions: Array<FilterExpressionType>;
  offset: bigint;
  limit: bigint;
  databaseName: string;
  tableName: string;
}
export type PaginatedScanOutputType =
  | {
      ok: {
        offset: bigint;
        limit: bigint;
        nonScannedItemCount: bigint;
        items: Array<{
          id: string;
          item: Array<[string, AttributeDataValue__1]>;
        }>;
        scannedItemCount: bigint;
      };
    }
  | { err: Array<string> };
export type QueryOpsInputType =
  | {
      PaginatedScanInput: PaginatedScanInputType;
    }
  | { GetItemByIdInput: GetItemByIdInputType }
  | { GetTableMetadataInput: GetTableMetadataInputType }
  | { ScanAndGetIdsInput: ScanAndGetIdsInputType }
  | { BatchGetItemByIdInput: BatchGetItemByIdInputType }
  | { ScanInput: ScanInputType }
  | { GetItemCountInput: GetItemCountInputType };
export type QueryOpsOutputType =
  | {
      GetTableMetadataOutput: GetTableMetadataOutputType;
    }
  | { PaginatedScanOutput: PaginatedScanOutputType }
  | { ScanAndGetIdsOutput: ScanAndGetIdsOutputType }
  | { GetItemCountOutput: GetItemCountOutputType }
  | { GetItemByIdOutput: GetItemByIdOutputType }
  | { BatchGetItemByIdOutput: BatchGetItemByIdOutputType }
  | { ScanOutput: ScanOutputType };
export type RelationalExpressionAttributeDataValue =
  | { int: bigint }
  | { nat: bigint }
  | { float: number }
  | { principal: Principal }
  | { blob: Uint8Array | number[] }
  | { bool: boolean }
  | { char: number }
  | { int8: number }
  | { nat8: number }
  | { text: string }
  | { nat16: number }
  | { nat32: number }
  | { nat64: bigint }
  | { int16: number }
  | { int32: number }
  | { int64: bigint };
export type Result = { ok: string } | { err: Array<string> };
export interface ScanAndGetIdsInputType {
  filterExpressions: Array<FilterExpressionType>;
  databaseName: string;
  tableName: string;
}
export type ScanAndGetIdsOutputType =
  | { ok: { ids: Array<string> } }
  | { err: Array<string> };
export interface ScanInputType {
  filterExpressions: Array<FilterExpressionType>;
  databaseName: string;
  tableName: string;
}
export type ScanOutputType =
  | {
      ok: Array<{ id: string; item: Array<[string, AttributeDataValue__1]> }>;
    }
  | { err: Array<string> };
export type StreamingCallback = ActorMethod<
  [StreamingCallbackToken__1],
  StreamingCallbackHttpResponse__1
>;
export interface StreamingCallbackHttpResponse {
  token: [] | [StreamingCallbackToken__1];
  body: Uint8Array | number[];
}
export interface StreamingCallbackHttpResponse__1 {
  token: [] | [StreamingCallbackToken__1];
  body: Uint8Array | number[];
}
export interface StreamingCallbackToken {
  file_size: bigint;
  index: bigint;
  chunk_size: bigint;
  file_id: string;
}
export interface StreamingCallbackToken__1 {
  file_size: bigint;
  index: bigint;
  chunk_size: bigint;
  file_id: string;
}
export type StreamingStrategy = {
  Callback: {
    token: StreamingCallbackToken__1;
    callback: StreamingCallback;
  };
};
export type StringAttributeDataValue = { char: number } | { text: string };
export type Subaccount = Uint8Array | number[];
export interface TableIndexMetadata {
  name: IndexName;
  attributeName: AttributeName;
}
export interface TableMetadataOutputType {
  attributes: Array<AttributeMetadata>;
  indexes: Array<TableIndexMetadata>;
}
export interface UpdateItemInputType {
  id: string;
  databaseName: string;
  attributeDataValues: Array<[string, AttributeDataValue__1]>;
  tableName: string;
}
export type UpdateItemOutputType =
  | {
      ok: { id: string; item: Array<[string, AttributeDataValue__1]> };
    }
  | { err: Array<string> };
export type UpdateOpsInputType =
  | {
      DropAttributeInput: DropAttributeInputType;
    }
  | { UpdateItemInput: UpdateItemInputType }
  | { CreateDatabaseInput: CreateDatabaseInputType }
  | { CreateTableInput: CreateTableInputType }
  | { CreateItemInput: CreateItemInputType }
  | { AddAttributeInput: AddAttributeInputType };
export type UpdateOpsOutputType =
  | {
      AddAttributeOutput: AddAttributeOutputType;
    }
  | { CreateItemOutput: CreateItemOutputType }
  | { UpdateItemOutput: UpdateItemOutputType }
  | { CreateDatabaseOutput: CreateDatabaseOutputType }
  | { CreateTableOutput: CreateTableOutputType }
  | { DropAttributeOutput: DropAttributeOutputType };
export interface UploadFile {
  fileBlob: Uint8Array | number[];
  fileName: string;
  fileType: string;
}
export type uploadFile = string;
export interface _SERVICE {
  create_token: ActorMethod<[CreateToken], Result>;
  get_burned_tokens: ActorMethod<[], BurnedTokenOutput>;
  get_burned_tokens_test: ActorMethod<[string], BurnedTokenOutput>;
  get_total_bits_evaporated: ActorMethod<[], number>;
  get_total_bits_evaporated_test: ActorMethod<[string], number>;
  get_user_tokens: ActorMethod<[], GetTokensByPidOutput>;
  get_user_tokens_test: ActorMethod<[string], GetTokensByPidOutput>;
  http_request: ActorMethod<[HttpRequest], HttpResponse>;
  http_request_streaming_callback: ActorMethod<
    [StreamingCallbackToken],
    StreamingCallbackHttpResponse
  >;
  is_unique_token_name: ActorMethod<[string], boolean>;
  is_unique_token_symbol: ActorMethod<[string], boolean>;
  queryOperation: ActorMethod<
    [{ queryOpsInput: QueryOpsInputType }],
    QueryOpsOutputType
  >;
  updateOperation: ActorMethod<
    [{ updateOpsInput: UpdateOpsInputType }],
    UpdateOpsOutputType
  >;
  uploadImage: ActorMethod<[UploadFile], uploadFile>;
  usd_to_icp: ActorMethod<[number], bigint>;
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
