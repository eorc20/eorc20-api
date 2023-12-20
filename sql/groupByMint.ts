import fs from "fs";
import { query } from "../src/clickhouse/query.js";
import { Static, Type } from "@sinclair/typebox";


export const GroupByMint = Type.Object({
    tick: Type.String(),
    active_supply: Type.Number(),
    transactions: Type.Number(),
    holders: Type.Number(),
})
export type GroupByMint = Static<typeof GroupByMint>

export const groupByMintResponse = Type.Object({
    rows: Type.Number({example: 1}),
    data: Type.Array(GroupByMint),
})

export async function groupByMint() {
    const sql = fs.readFileSync("./sql/groupByMint.sql", "utf-8");
    console.log(sql)
    return query<GroupByMint>({query: sql});
}

// groupByMint().then(console.log);