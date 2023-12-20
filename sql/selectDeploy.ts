import fs from "fs";
import { query } from "../src/clickhouse/query.js";
import { Static, Type } from "@sinclair/typebox";

export const SelectDeploy = Type.Object({
    tick: Type.String(),
    active_supply: Type.Number(),
    transactions: Type.Number(),
    holders: Type.Number(),
})
export type SelectDeploy = Static<typeof SelectDeploy>

export const SelectDeployResponse = Type.Object({
    rows: Type.Number({example: 1}),
    data: Type.Array(SelectDeploy),
})

export async function selectDeploy() {
    const sql = fs.readFileSync("./sql/selectDeploy.sql", "utf-8");
    console.log(sql)
    return query<SelectDeploy>({query: sql});
}

// selectDeploy().then(console.log);