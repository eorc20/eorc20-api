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
    progress: Type.String({example: '0.541'}),
})
export type GroupBySupply = Static<typeof GroupBySupply>

export const GroupBySupplyResponse = Type.Object({
    rows: Type.Number({example: 1}),
    data: Type.Array(GroupBySupply),
})

export async function groupBySupply() {
    const deploy = await selectDeploy();
    const mints = await groupByMint();

    const data = deploy.data.map((deploy) => {
        const mint = mints.data.find((mint) => mint.tick === deploy.tick);
        return {
            ...deploy,
            ...mint,
        };
    });
    mints.data = data;
    mints.rows = data.length;
    mints.meta = [];
    return mints;
}

groupBySupply().then(console.log)