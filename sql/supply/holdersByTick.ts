import fs from "fs";
import { query } from "../../src/clickhouse/query.js";
import { Static, Type } from "@sinclair/typebox";

export const HoldersByTick = Type.Object({
    tick: Type.String(),
    holders: Type.String(),
    transactions: Type.String(),
    active_supply: Type.String(),
    timestamp: Type.String(),
    completed_time: Type.String(),
})
export type HoldersByTick = Static<typeof HoldersByTick>

export async function holdersByTick() {
    const sql = fs.readFileSync("./sql/supply/holdersByTick.sql", "utf-8");
    console.log(sql)
    const { data } = await query<HoldersByTick>({ query: sql });
    return new Map(data.map((row) => [row.tick, row]));
}

// holdersByTick().then(console.log);