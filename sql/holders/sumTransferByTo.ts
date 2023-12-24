import fs from "fs";
import { query } from "../../src/clickhouse/query.js";
import { Static, Type } from "@sinclair/typebox";

export const SumTransferByTo = Type.Object({
    to: Type.String({example: '0x64100aed32814e60604611fd4d860edf81234567'}),
    tick: Type.String({example: 'eoss'}),
    amt: Type.Number({example: '105850000'}),
})
export type SumTransferByTo = Static<typeof SumTransferByTo>

export const sumTransferByToResponse = Type.Object({
    rows: Type.Number({example: 500}),
    data: Type.Array(SumTransferByTo),
})

export async function sumTransferByTo() {
    const sql = fs.readFileSync("./sql/sumTransferByTo.sql", "utf-8");
    const { data, rows } = await query<SumTransferByTo>({query: sql});
    return { data, rows }
}

// sumTransferByTo().then(console.log);