import { Static, Type } from "@sinclair/typebox";
import { Address } from "viem";
import { sumMintByAddress } from "./sumMintByAddress.js";
import { sumTransferByAddress } from "./sumTransferByAddress.js";
import { getAmount, getTransactions, sumMintFrom, sumTransferFrom, sumTransferTo } from "../balance/balance.js";

export const Tokens = Type.Object({
    address: Type.String({example: "0x64100aed32814e60604611fd4d860edf81234567",}),
    amount: Type.Number({example: 123760000}),
    transactions: Type.Number({example: 103}),
    tick: Type.String({example: "eoss",}),
    mintFrom: Type.Number({example: 123760000}),
    transferFrom: Type.Number({example: 123760000}),
    transferTo: Type.Number({example: 123760000}),
    // tick_created: Type.String({example: "2023-12-09 06:44:52",}),
    // tick_id: Type.String({example: "0x120708f753e431bdfba5b7c6e58c8ea3b6375078648e48d8e354cac5f8c4ba6a"}),
})

export type Tokens = Static<typeof Tokens>

export const TokensResponse = Type.Object({
    rows: Type.Number({example: 500}),
    data: Type.Array(Tokens),
})

export async function tokens(address: Address, tick: string, block_number: number) {
    // queries
    const [mintFrom, transferFrom, transferTo] = await Promise.all([
        sumMintFrom(address, tick),
        sumTransferFrom(address, tick, block_number),
        sumTransferTo(address, tick, block_number)
    ]);
    const amount = getAmount(mintFrom) - getAmount(transferFrom) + getAmount(transferTo)
    const transactions = getTransactions(mintFrom) + getTransactions(transferFrom) + getTransactions(transferTo)

    return {
        data: [{
            address,
            tick,
            amount,
            transactions,
            mintFrom: getAmount(mintFrom),
            transferFrom: getAmount(transferFrom),
            transferTo: getAmount(transferTo)
        }],
        rows: 1
    }
}

// tokens("0xbBBBbBbbbBBBBbbbbbbBBbBB5530EA015b900000", "eoss", 9999999999999).then(console.log);