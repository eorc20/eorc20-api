import { Static, Type } from "@sinclair/typebox";
import { groupByHolders } from "./groupByHolders.js";
import { sumTransferByFrom } from "./sumTransferByFrom.js";
import { sumTransferByTo } from "./sumTransferByTo.js";

export const Holders = Type.Object({
    tick: Type.String({example: 'eoss'}),
    address: Type.String({example: '0x64100aed32814e60604611fd4d860edf81234567'}),
    percentage: Type.Number({example: '0.0005040476190475998'}),
    max_supply: Type.Number({example: '0.0001'}),
    amount: Type.Number({example: '105850000'}),
})
export type Holders = Static<typeof Holders>

export const HoldersResponse = Type.Object({
    rows: Type.Number({example: 500}),
    data: Type.Array(Holders),
})

export async function holders(tick: string) {
    let max_supply = 0;
    const balances = new Map<string, number>();
    const [holders, transferFrom, transferTo] = await Promise.all([
        groupByHolders(tick),
        sumTransferByTo(tick),
        sumTransferByFrom(tick),
    ]);

    for ( const row of holders.data) {
        balances.set(row.address, Number(row.amount));
        max_supply = row.max_supply;
    }
    for ( const row of transferFrom.data) {
        balances.set(row.to, (balances.get(row.to) || 0) + Number(row.amt));
    }
    for ( const row of transferTo.data) {
        balances.set(row.from, (balances.get(row.from) || 0) - Number(row.amt));
    }
    const data: Holders[] = []
    for ( const [address, amount] of balances.entries() ) {
        data.push({
            tick,
            address,
            percentage: Number((amount / max_supply).toFixed(5)),
            max_supply,
            amount,
        })
    }
    data.sort((a, b) => b.amount - a.amount);
    data.filter((a) => a.amount > 0);
    data.splice(500);
    return {data, rows: data.length};
}

// holders().then(console.log);