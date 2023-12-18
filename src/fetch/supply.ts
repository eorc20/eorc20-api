import fs from "fs";
import { query } from "../clickhouse/query.js";

interface GroupBySupply {
    tick: string;               // 'eoss',
    protocol: string;           // 'eorc20',
    deploy_timestamp: string;   // '2023-12-09 06:44:52',
    last_block_number: number;   // 21443557,
    last_timestamp: string;     // '2023-12-09 06:50:45',
    holders: string;            // '113336280',
    active_supply: string;      // '1133545550000',
    max_supply: string;         // '210000000000',
    progress: string;           //  5.3978359523809525,
    transactions: string;       //  '113336280'
}

export function groupBySupply() {
    const group_by_supply = fs.readFileSync("./sql/groupBySupply.sql", "utf-8");
    return query<GroupBySupply>(group_by_supply);
}