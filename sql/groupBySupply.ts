import fs from "fs";
import { query } from "../src/clickhouse/query.js";
import { Static, Type } from "@sinclair/typebox";


export const GroupBySupply = Type.Object({
    tick: Type.String({example: 'eoss'}),
    protocol: Type.String({example: 'eorc20'}),
    // limit_by_amount
    // decimal
    // deploy_address
    deploy_timestamp: Type.String({example: '2023-12-09 06:44:52'}),
    last_block_number: Type.String({example: 21443557}),
    last_timestamp: Type.String({example: '2023-12-09 06:50:45'}),
    holders: Type.String({example: '113336280'}),
    active_supply: Type.String({example: '1133545550000'}),
    max_supply: Type.String({example: '210000000000'}),
    transactions: Type.String({example:  '113336280'}),
    progress: Type.String({example: '0.541'}),
})
export type GroupBySupply = Static<typeof GroupBySupply>

export const GroupBySupplyResponse = Type.Object({
    rows: Type.Number({example: 1}),
    data: Type.Array(GroupBySupply),
})

export async function groupBySupply() {
    const sql = fs.readFileSync("./sql/groupBySupply.sql", "utf-8");
    console.log(sql)
    return query<GroupBySupply>({query: sql});
}

// groupBySupply();