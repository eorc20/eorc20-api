import fs from "fs";
import { QueryResponse, query } from "../../src/clickhouse/query.js";
import { Address } from "viem";

interface SumTransfer {
    address: string;
    tick: string;
    amt: number;
    transactions: number;
    last_block_number: string;
}

export async function sumTransferFrom(from: Address, tick: string, block_number: number) {
    const sql = fs.readFileSync("./sql/balance/sumTransferFrom.sql", "utf-8");
    // console.log("sumTransferFrom", {from, tick, block_number, sql})
    return query<SumTransfer>({query: sql, query_params: {address: from.toLowerCase(), tick, block_number}});
}

export async function sumTransferTo(from: Address, tick: string, block_number: number) {
    const sql = fs.readFileSync("./sql/balance/sumTransferTo.sql", "utf-8");
    // console.log("sumTransferTo", {from, tick, block_number, sql})
    return query<SumTransfer>({query: sql, query_params: {address: from.toLowerCase(), tick, block_number}});
}

export async function sumMintFrom(from: Address, tick: string) {
    const sql = fs.readFileSync("./sql/balance/sumMintFrom.sql", "utf-8");
    // console.log("sumMintFrom", {from, tick, sql})
    return query<SumTransfer>({query: sql, query_params: {address: from.toLowerCase(), tick}});
}

export function getAmount(response: QueryResponse<SumTransfer>) {
    if ( response.data.length > 0 ) {
        return Number(response.data[0].amt);
    }
    return 0;
}

export function getTransactions(response: QueryResponse<SumTransfer>) {
    if ( response.data.length > 0 ) {
        return Number(response.data[0].transactions);
    }
    return 0;
}

export async function balance(address: Address, tick: string, block_number: number) {
    // queries
    const mintFrom = getAmount(await sumMintFrom(address, tick));
    const transferFrom = getAmount(await sumTransferFrom(address, tick, block_number));
    const transferTo = getAmount(await sumTransferTo(address, tick, block_number));

    return {
        address,
        tick,
        amt: mintFrom - transferFrom + transferTo,
        mintFrom,
        transferFrom,
        transferTo
    };
}

// balance("0x06356df2181e4ef417b9aaa0a8848df804cc20f1", "eoss", 22732942).then(console.log);