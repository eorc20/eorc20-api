import fs from "fs";
import { query } from "../../src/clickhouse/query.js";
import { Static, Type } from "@sinclair/typebox";
import { Address } from "viem";

export const TokensV2 = Type.Object({
    address: Type.String({example: "0x6d409f58a965ef0b3857465496d17d64820a78ba"}),
    tick: Type.String({example: "eoss"}),
    amount: Type.Number({example: 1500001400}),
    mintFrom: Type.Number({example: 0}),
    transferFrom: Type.Number({example: 0}),
    transferTo: Type.Number({example: 1500001400}),
    transactions: Type.Number({example: 6}),
    firstTimestamp: Type.String({example: "2023-12-22 22:53:11"}),
    lastTimestamp: Type.String({ example: "2023-12-24 01:43:37" }),
    percentage: Type.Number({example: 0.007143,}),
})

export type TokensV2 = Static<typeof TokensV2>

export const TokensV2Response = Type.Object({
    rows: Type.Number({example: 500}),
    data: Type.Array(TokensV2),
})

export async function tokensV2(address: Address, block_number: number) {
    const sql = fs.readFileSync("./sql/tokens.v2/tokens.sql", "utf-8");
    const { data, rows } = await query<TokensV2>({ query: sql, query_params: { address, block_number } });

    // add rank
    data.forEach((item: any, index) => {
        item.percentage = Number(item.percentage.toFixed(6));

        // convert to numbers
        item.amount = Number(item.amount);
        item.mintFrom = Number(item.mintFrom);
        item.transferFrom = Number(item.transferFrom);
        item.transferTo = Number(item.transferTo);
        item.transactions = Number(item.transactions);
    });
    return { data, rows }
}

// tokensV2("0xBBbBbbBBbbBbbBBBbBBbbBbB55318063A0000000", 9999999999999).then(console.log);