import fs from "fs";
import { query } from "../src/clickhouse/query.js";
import { Static, Type } from "@sinclair/typebox";
import { Address } from "viem";

export const GroupTokensByAddress = Type.Object({
    tick: Type.String({example: 'eoss'}),
    address: Type.String({example: '0x64100aed32814e60604611fd4d860edf81234567'}),
    percentage: Type.Number({example: '0.0005040476190475998'}),
    amount: Type.Number({example: '105850000'}),
})
export type GroupTokensByAddress = Static<typeof GroupTokensByAddress>

export const groupTokensByAddressResponse = Type.Object({
    rows: Type.Number({example: 500}),
    data: Type.Array(GroupTokensByAddress),
})

export async function groupTokensByAddress(address: Address) {
    const sql = fs.readFileSync("./sql/groupTokensByAddress.sql", "utf-8");
    return query<GroupTokensByAddress>({query: sql, query_params: {address}});
}

// groupTokensByAddress("0x64100aed32814e60604611fd4d860edf81234567").then(console.log);