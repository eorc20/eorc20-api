import fs from "fs";
import { query } from "../../../src/clickhouse/query.js";
import { Static, Type } from "@sinclair/typebox";

export const Info = Type.Object({
    id: Type.String(),
    from: Type.String(),
    to: Type.String(),
    p: Type.String(),
    op: Type.String(),
    tick: Type.String(),
    amt: Type.String(),
    block_number: Type.String(),
    timestamp: Type.String(),
    error_code: Type.String(),
    status: Type.String(),
})

export type Info = Static<typeof Info>

export const InfoResponse = Type.Object({
    rows: Type.Number({example: 1}),
    data: Type.Array(Info),
})

export async function info(transaction_hash: string) {
    const sql = fs.readFileSync("./sql/inscription/info/info.sql", "utf-8");
    const { data, rows } = await query<Info>({ query: sql, query_params: { transaction_hash } });
    return { data, rows }
}

// 0x41b6a15b04c1a7025c70cc051fb6b0340b6ed98cd8eeadc51179113f27602985