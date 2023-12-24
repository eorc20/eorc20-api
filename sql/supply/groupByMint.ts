import fs from "fs";
import { query } from "../../src/clickhouse/query.js";
import { Static, Type } from "@sinclair/typebox";


export const GroupByMint = Type.Object({
    tick: Type.String(),
    active_supply: Type.String(),
    transactions: Type.String(),
    holders: Type.String(),
    first_timestamp: Type.String(),
    last_timestamp: Type.String()
})
export type GroupByMint = Static<typeof GroupByMint>

export const groupByMintResponse = Type.Object({
    rows: Type.Number({example: 1}),
    data: Type.Array(GroupByMint),
})

export async function groupByMint() {
    const sql = fs.readFileSync("./sql/groupByMint.sql", "utf-8");
    console.log(sql)
    const { data, rows } = await query<GroupByMint>({query: sql});
    return { data, rows }
}

// groupByMint().then(console.log);