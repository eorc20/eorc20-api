import fs from "fs";
import { query } from "../../src/clickhouse/query.js";
import { Static, Type } from "@sinclair/typebox";

export const Inscription = Type.Object({
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

export type Inscription = Static<typeof Inscription>

export const InscriptionResponse = Type.Object({
    rows: Type.Number({example: 500}),
    data: Type.Array(Inscription),
})

export async function inscription(owner = '', limit: number, offset: number) {
    if ( owner ) {
        const sql = fs.readFileSync("./sql/inscription/inscription_by_owner.sql", "utf-8");
        const { data, rows } = await query<Inscription>({ query: sql, query_params: { owner, limit } });
        return { data, rows }
    }

    const sql = fs.readFileSync("./sql/inscription/inscription.sql", "utf-8");
    const { data, rows } = await query<Inscription>({ query: sql, query_params: { owner, limit } });
    return { data, rows }
}

// inscription("0xBBbBbbBBbbBbbBBBbBBbbBbB55318063A0000000", 500, 0).then(console.log);