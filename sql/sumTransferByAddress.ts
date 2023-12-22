import { query } from "../src/clickhouse/query.js";
import { Static, Type } from "@sinclair/typebox";
import { Address } from "viem";

export const SumTransferByAddress = Type.Object({
    from: Type.String({example: "0x64100aed32814e60604611fd4d860edf81234567",}),
    to: Type.String({example: "0x64100aed32814e60604611fd4d860edf81234567",}),
    amt: Type.String({example: "123760000"}),
    tick: Type.String({example: "eoss",}),
    transactions: Type.Number({example: 1000}),
    first_timestamp: Type.String({example: "2023-12-09 08:22:41",}),
    last_timestamp: Type.String({example: "2023-12-09 06:44:52",}),
})

export type SumTransferByAddress = Static<typeof SumTransferByAddress>

export const sumTransferByAddressResponse = Type.Object({
    rows: Type.Number({example: 500}),
    data: Type.Array(SumTransferByAddress),
})


export async function sumTransferByAddress(options: {from?: Address, to?: Address}) {
    let sql = `
        SELECT *
        FROM transfer_sum_mv
    `
    const { from, to } = options;
    if ( from && to ) throw new Error("You can only specify one address");
    if ( from ) {
        sql += `WHERE from = {address: String}`
        console.log("sumTransferByAddress", {from, to, sql});
        return query<SumTransferByAddress>({query: sql, query_params: {address: from.toLowerCase()}});
    }
    if ( to ) {
        sql += `WHERE to = {address: String}`
        console.log("sumTransferByAddress", {from, to, sql});
        return query<SumTransferByAddress>({query: sql, query_params: {address: to.toLowerCase()}});
    }
    throw new Error("You must specify an address");
}

// sumTransferByAddress({from: "0x194b692235a0f7ea22f1aac68a8ca11d8eb6b2d4"}).then(console.log);