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
    const transfer_from = await sumTransferByAddress({from: address});
    const transfer_to = await sumTransferByAddress({to: address});

    let transactions: {[ticker: string]: number } = {};
    let amount: {[ticker: string]: number } = {};

    // get tickers
    const tickers = new Set<string>()
    for ( const row of mint.data ) tickers.add(row.tick);
    for ( const row of transfer_from.data ) tickers.add(row.tick);
    for ( const row of transfer_to.data ) tickers.add(row.tick);

    // initialize
    for ( const ticker of tickers ) {
        transactions[ticker] = 0;
        amount[ticker] = 0;
    }

    // mint
    for ( const row of mint.data ) {
        transactions[row.tick] += Number(row.transactions);
        amount[row.tick] += Number(row.amt);
    }

    // transfer sender (-negative balance)
    for ( const row of transfer_from.data ) {
        transactions[row.tick] += Number(row.transactions);
        amount[row.tick] -= Number(row.amt);
    }

    // transfer receiver (+positive balance)
    for ( const row of transfer_from.data ) {
        transactions[row.tick] += Number(row.transactions);
        amount[row.tick] += Number(row.amt);
    }
    const data: SumByAddress[] = [];
    for ( const ticker of tickers ) {
        data.push({
            address,
            amount: amount[ticker],
            transactions: transactions[ticker],
            // last_updated: new Date().toISOString(),
            tick: ticker,
            // tick_created: new Date().toISOString(),
            // tick_id
        });
    }

    return { data, rows: data.length }
}

// sumByAddress("0x354d44ad5ecbe2b6244a63b24babff9aa5200303").then(console.log);