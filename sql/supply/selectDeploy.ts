import fs from "fs";
import { query } from "../../src/clickhouse/query.js";
import { Static, Type } from "@sinclair/typebox";

export const SelectDeploy = Type.Object({
    tick: Type.String(),
    deploy_address: Type.String(),
    deploy_timestamp: Type.String(),
    deploy_block_number: Type.String(),
    max_supply: Type.String(),
    limit_by_amount: Type.String(),
    protocol: Type.String(),
})
export type SelectDeploy = Static<typeof SelectDeploy>

export const SelectDeployResponse = Type.Object({
    rows: Type.Number({example: 1}),
    data: Type.Array(SelectDeploy),
})

export async function selectDeploy() {
    const sql = fs.readFileSync("./sql/supply/selectDeploy.sql", "utf-8");
    // console.log(sql)
    const { data, rows } = await query<SelectDeploy>({query: sql});
    return { data, rows }
}

// selectDeploy().then(console.log);