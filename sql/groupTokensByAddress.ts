import fs from "fs";
import { query } from "../src/clickhouse/query.js";
import { Static, Type } from "@sinclair/typebox";
import { Address } from "viem";

export const GroupTokensByAddress = Type.Object({
    address: Type.String({example: "0x64100aed32814e60604611fd4d860edf81234567",}),
    amount: Type.String({example: "123760000"}),
    last_updated: Type.String({example: "2023-12-09 08:22:41",}),
    tick: Type.String({example: "eoss",}),
    tick_created: Type.String({example: "2023-12-09 06:44:52",}),
    tick_id: Type.String({example: "0x120708f753e431bdfba5b7c6e58c8ea3b6375078648e48d8e354cac5f8c4ba6a"}),
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