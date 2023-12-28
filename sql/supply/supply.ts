import { selectDeploy } from "./selectDeploy.js";
import { holdersByTick } from "./holdersByTick.js";
import { Static, Type } from "@sinclair/typebox";

export const Supply = Type.Object({
    // mint
    tick: Type.String({example: 'eoss'}),
    decimals: Type.Number({example: 0}),
    holders: Type.Number({example: 22180}),
    active_supply: Type.Number({example: 210000000000}),
    transactions: Type.Number({example:  21003672}),

    // extras
    // last_block_number: Type.String({example: 21443557}),
    last_timestamp: Type.String({example: '2023-12-09 06:50:45'}),
    last_mint_timestamp: Type.String({example: '2023-12-09 06:44:52'}),

    // deploy
    protocol: Type.String({example: 'eorc20'}),
    limit_by_amount: Type.Number({example: 10000}),
    deploy_address: Type.String({example: '0x30b7cadcb65e113abd3376dbed624e1baed9a7f3'}),
    deploy_timestamp: Type.String({ example: '2023-12-09 06:44:52' }),
    deploy_block_number: Type.Number({ example: 21443204 }),
    max_supply: Type.Number({example: 210000000000}),

    // combined
    progress: Type.Number({example: 0.5413}),
})
export type Supply = Static<typeof Supply>

export const SupplyResponse = Type.Object({
    data: Type.Array(Supply),
    rows: Type.Number({example: 1}),
})

export async function supply(ticks: string[] = ["eoss"]) {
    const [deploy, holdersMap] = await Promise.all([
        selectDeploy(),
        holdersByTick()
    ]);

    // filter by tick
    deploy.data = deploy.data.filter((deploy) => holdersMap.has(deploy.tick));
    deploy.data = deploy.data.filter((deploy) => ticks.includes(deploy.tick));

    // join holders to deploy
    const data = deploy.data.map((deploy) => {
        const holdersData = holdersMap.get(deploy.tick);
        const max_supply = Number(deploy.max_supply);
        let active_supply = Number(holdersData?.active_supply || '0');
        if ( active_supply > max_supply ) active_supply = max_supply;
        const holders = Number(holdersData?.holders || '0');
        const transactions = Number(holdersData?.transactions || '0');
        const progress = Number((active_supply / max_supply).toFixed(4));
        const limit_by_amount = Number(deploy.limit_by_amount);

        return {
            ...deploy,
            limit_by_amount,
            ...holdersData,
            transactions,
            holders,
            active_supply,
            max_supply,
            progress,
        };
    });

    return { data, rows: data.length };
}

supply().then(console.log)