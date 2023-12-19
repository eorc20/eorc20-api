import fs from "fs";
import { query } from "../src/clickhouse/query.js";
import { Static, Type } from "@sinclair/typebox";

export const GroupByHolders = Type.Object({
    tick: Type.String({example: 'eoss'}),
    address: Type.String({example: '0x64100aed32814e60604611fd4d860edf81234567'}),
    percentage: Type.Number({example: '0.0005040476190475998'}),
    amount: Type.Number({example: '105850000'}),
})
export type GroupByHolders = Static<typeof GroupByHolders>

export const GroupByHoldersResponse = Type.Object({
    rows: Type.Number({example: 500}),
    data: Type.Array(GroupByHolders),
})

export async function groupByHolders() {
    const sql = fs.readFileSync("./sql/groupByHolders.sql", "utf-8");
    return query<GroupByHolders>({query: sql});
}

// groupByHolders().then(console.log);