import { Static, Type } from "@sinclair/typebox";
import { Address } from "viem";
import { sumMintByAddress } from "./sumMintByAddress.js";
import { sumTransferByAddress } from "./sumTransferByAddress.js";

export const SumByAddress = Type.Object({
    address: Type.String({example: "0x64100aed32814e60604611fd4d860edf81234567",}),
    amount: Type.Number({example: 123760000}),
    transactions: Type.Number({example: 103}),
    // last_updated: Type.String({example: "2023-12-09 08:22:41",}),
    tick: Type.String({example: "eoss",}),
    // tick_created: Type.String({example: "2023-12-09 06:44:52",}),
    // tick_id: Type.String({example: "0x120708f753e431bdfba5b7c6e58c8ea3b6375078648e48d8e354cac5f8c4ba6a"}),
})

export type SumByAddress = Static<typeof SumByAddress>

export const sumByAddressResponse = Type.Object({
    rows: Type.Number({example: 500}),
    data: Type.Array(SumByAddress),
})

export async function sumByAddress(address: Address) {
    const mint = await sumMintByAddress(address);
    const transfer = await sumTransferByAddress(address);

    let map_transactions: {[ticker: string]: number } = {};
    let map_amount: {[ticker: string]: number } = {};

    // get tickers
    const tickers = new Set<string>()
    for ( const row of mint.data ) tickers.add(row.tick);
    for ( const row of transfer.data ) tickers.add(row.tick);

    // initialize
    for ( const ticker of tickers ) {
        map_transactions[ticker] = 0;
        map_amount[ticker] = 0;
    }

    // mint
    for ( const row of mint.data ) {
        map_transactions[row.tick] += Number(row.transactions);
        map_amount[row.tick] += Number(row.amt);
    }

    // transfer (balance change)
    for ( const row of transfer.data ) {
        map_transactions[row.tick] += Number(row.transactions);
        map_amount[row.tick] += Number(row.balance_change);
    }
    const data: SumByAddress[] = [];
    for ( const ticker of tickers ) {
        let amount = map_amount[ticker];
        if ( amount < 0 ) {
            console.error("amount < 0", {address, amount})
            amount = 0;
        }

        data.push({
            address,
            amount,
            transactions: map_transactions[ticker],
            // last_updated: new Date().toISOString(),
            tick: ticker,
            // tick_created: new Date().toISOString(),
            // tick_id
        });
    }

    return { data, rows: data.length }
}

// sumByAddress("0xaa2F34E41B397aD905e2f48059338522D05CA534").then(console.log);