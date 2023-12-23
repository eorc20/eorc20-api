import fs from "fs";
import { query } from "../src/clickhouse/query.js";
import { Static, Type } from "@sinclair/typebox";
import { Address } from "viem";

export const SumTransferByAddress = Type.Object({
    address: Type.String({example: "0x64100aed32814e60604611fd4d860edf81234567",}),
    p: Type.String({example: "eorc20"}),
    op: Type.String({example: "transfer"}),
    tick: Type.String({example: "eoss"}),

    from: Type.String({example: "0x64100aed32814e60604611fd4d860edf81234567",}),
    to: Type.String({example: "0x6d409f58a965ef0b3857465496d17d64820a78ba",}),
    amt: Type.String({example: "100"}),

    balance_change: Type.String({example: "-100"}),
    transactions: Type.Number({example: 1}),
    first_timestamp: Type.String({example: "2023-12-22 22:53:11"}),
    last_timestamp: Type.String({example: "2023-12-22 22:53:11"}),
    first_block_number: Type.String({example: 22624503}),
    last_block_number: Type.String({example: 22624503}),
})

export type SumTransferByAddress = Static<typeof SumTransferByAddress>

export const sumTransferByAddressResponse = Type.Object({
    rows: Type.Number({example: 500}),
    data: Type.Array(SumTransferByAddress),
})

export async function sumTransferByAddress(address: Address) {
    const sql = fs.readFileSync("./sql/sumTransferByAddress.sql", "utf-8");
    console.log("sumTransferByAddress", {address, sql});
    return query<SumTransferByAddress>({query: sql, query_params: {address}});
}

// sumTransferByAddress("0xbbbbbbbbbbbbbbbbbbbbbbbb55318063a0000000").then(console.log);