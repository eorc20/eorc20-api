import fs from "fs";
import { query } from "../../src/clickhouse/query.js";
import { Static, Type } from "@sinclair/typebox";

export const HoldersV2 = Type.Object({
    rank: Type.Number({example: 6}),
    address: Type.String({example: "0x6d409f58a965ef0b3857465496d17d64820a78ba"}),
    tick: Type.String({example: "eoss"}),
    amount: Type.Number({example: 1500001400}),
    mint_from: Type.Number({example: 0}),
    transfer_from: Type.Number({example: 0}),
    transfer_to: Type.Number({example: 1500001400}),
    transactions: Type.Number({example: 6}),
    first_timestamp: Type.String({example: "2023-12-22 22:53:11"}),
    last_timestamp: Type.String({ example: "2023-12-24 01:43:37" }),
    percentage: Type.Number({example: 0.007143,}),
})

export type HoldersV2 = Static<typeof HoldersV2>

export const HoldersV2Response = Type.Object({
    rows: Type.Number({example: 500}),
    data: Type.Array(HoldersV2),
})

export async function holdersV2(tick: string, limit: number, offset: number) {
    const sql = fs.readFileSync("./sql/holders.v2/holders.sql", "utf-8");
    const { data, rows } = await query<HoldersV2>({ query: sql, query_params: { tick, limit, offset } });

    // add rank
    data.forEach((item: any, index) => {
        item.rank = 1 + index + offset;
        item.percentage = Number(item.percentage.toFixed(6));

        // convert to numbers
        item.amount = Number(item.amount);
        item.mint_from = Number(item.mint_from);
        item.transfer_from = Number(item.transfer_from);
        item.transfer_to = Number(item.transfer_to);
        item.transactions = Number(item.transactions);
    });
    return { data, rows }
}

// holdersV2("eoss", 500, 0).then(console.log);