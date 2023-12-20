import { selectDeploy } from "./selectDeploy.js";
import { groupByMint } from "./groupByMint.js";
import { Static, Type } from "@sinclair/typebox";

export const GroupBySupply = Type.Object({
    // mint
    tick: Type.String({example: 'eoss'}),
    decimals: Type.Number({example: '4'}),
    holders: Type.String({example: '113336280'}),
    active_supply: Type.String({example: '1133545550000'}),
    transactions: Type.String({example:  '113336280'}),

    // extras
    last_block_number: Type.String({example: 21443557}),
    last_timestamp: Type.String({example: '2023-12-09 06:50:45'}),

    // deploy
    protocol: Type.String({example: 'eorc20'}),
    limit_by_amount: Type.Number({example: 10000}),
    deploy_address: Type.String({example: '0x30b7cadcb65e113abd3376dbed624e1baed9a7f3'}),
    deploy_timestamp: Type.String({example: '2023-12-09 06:44:52'}),
    max_supply: Type.String({example: '210000000000'}),

    // combined
    progress: Type.Number({example: 0.5413}),
})
export type GroupBySupply = Static<typeof GroupBySupply>

export const GroupBySupplyResponse = Type.Object({
    data: Type.Array(GroupBySupply),
    rows: Type.Number({example: 1}),
})

export async function groupBySupply() {
    const deploy = await selectDeploy();
    const mints = await groupByMint();

    const data = deploy.data.map((deploy) => {
        const mint = mints.data.find((mint) => mint.tick === deploy.tick);
        const max_supply = Number(deploy.max_supply);
        let active_supply = Number(mint?.active_supply || '0');
        if ( active_supply > max_supply ) active_supply = max_supply;
        const holders = Number(mint?.holders || '0');
        const transactions = Number(mint?.transactions || '0');
        const progress = Number((active_supply / max_supply).toFixed(4));
        const last_timestamp = mint?.last_timestamp || deploy.deploy_timestamp;
        const last_block_number = mint?.last_block_number || deploy.deploy_block_number;
        const limit_by_amount = Number(deploy.limit_by_amount);

        return {
            ...deploy,
            limit_by_amount,
            transactions,
            holders,
            active_supply,
            max_supply,
            progress,
            last_timestamp,
            last_block_number,
        };
    });

    return {
        data,
        rows: data.length,
    };
}

groupBySupply().then(console.log)