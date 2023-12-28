import fs from "fs";
import { query } from "../../src/clickhouse/query.js";
import { Static, Type } from "@sinclair/typebox";

export const SumTransferByFrom = Type.Object({
    from: Type.String({example: '0x64100aed32814e60604611fd4d860edf81234567'}),
    tick: Type.String({example: 'eoss'}),
    amt: Type.Number({example: '105850000'}),
})
export type SumTransferByFrom = Static<typeof SumTransferByFrom>

export const sumTransferByFromResponse = Type.Object({
    rows: Type.Number({example: 500}),
    data: Type.Array(SumTransferByFrom),
})

export async function sumTransferByFrom(tick: string) {
    const sql = fs.readFileSync("./sql/holders/sumTransferByFrom.sql", "utf-8");
    const { data, rows } = await query<SumTransferByFrom>({query: sql, query_params: {tick}});
    return { data, rows }
}

// sumTransferByFrom().then(console.log);