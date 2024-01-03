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

export async function inscription(owner: string, limit: number, offset: number) {
    const sql = fs.readFileSync("./sql/inscription/inscription.sql", "utf-8");
    const { data, rows } = await query<Inscription>({ query: sql, query_params: { owner, limit } });

    // // add rank
    // data.forEach((item: any, index) => {
    //     // item.rank = 1 + index + offset;
    //     // item.percentage = Number(item.percentage.toFixed(6));

    //     // convert to numbers
    //     item.amt = Number(item.amt);
    //     // item.mint_from = Number(item.mint_from);
    //     // item.transfer_from = Number(item.transfer_from);
    //     // item.transfer_to = Number(item.transfer_to);
    //     // item.transactions = Number(item.transactions);
    // });
    return { data, rows }
}

// inscription("0xBBbBbbBBbbBbbBBBbBBbbBbB55318063A0000000", 500, 0).then(console.log);