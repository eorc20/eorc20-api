import fs from "fs";
import { query } from "../../src/clickhouse/query.js";
import { Static, Type } from "@sinclair/typebox";
import { Address } from "viem";

interface SumTransferFrom {
    address: string;
    tick: string;
    from: string;
    amt: string;
    transactions: number;
    last_block_number: string;
}

export async function sumTransferFrom(from: Address) {
    const sql = fs.readFileSync("./sql/balance/sumTransferByAddress.sql", "utf-8");
    console.log("sumTransferFrom", {from, sql})
    return query<SumTransferFrom>({query: sql, query_params: {address: from.toLowerCase()}});
}

// sumTransferFrom("0x64453a52C311Cd01278DfEA79d74b8c096121344").then(console.log);