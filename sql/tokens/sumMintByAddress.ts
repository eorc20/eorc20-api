import { query } from "../../src/clickhouse/query.js";
import { Static, Type } from "@sinclair/typebox";
import { Address } from "viem";

export const SumMintByAddress = Type.Object({
    from: Type.String({example: "0x64100aed32814e60604611fd4d860edf81234567",}),
    amt: Type.String({example: "123760000"}),
    tick: Type.String({example: "eoss",}),
    transactions: Type.Number({example: 1000}),
    first_timestamp: Type.String({example: "2023-12-09 08:22:41",}),
    last_timestamp: Type.String({example: "2023-12-09 06:44:52",}),
})

export type SumMintByAddress = Static<typeof SumMintByAddress>

export const sumMintByAddressResponse = Type.Object({
    rows: Type.Number({example: 500}),
    data: Type.Array(SumMintByAddress),
})

export async function sumMintByAddress(from: Address) {
    let sql = `
        SELECT *
        FROM mint_sum_mv
        WHERE from = {address: String}
    `
    console.log("sumMintByAddress", {from, sql})
    return query<SumMintByAddress>({query: sql, query_params: {address: from.toLowerCase()}});
}

// sumMintByAddress("0x64453a52C311Cd01278DfEA79d74b8c096121344").then(console.log);