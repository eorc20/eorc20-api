SELECT
    tick,
    uniq(address) as holders,
    sum(transactions) as transactions,
    sum(mint_amt) as active_supply,
    max(mint_timestamp) as last_mint_timestamp,
    max(timestamp) as last_timestamp
FROM (
    -- mint --
    SELECT tick, from as address, transactions, amt as mint_amt, last_timestamp as timestamp, last_timestamp as mint_timestamp FROM mint_sum_mv
    UNION ALL
    -- transfer from --
    SELECT tick, from as address, 1 as transactions, 0 as mint_amt, timestamp, Null as mint_timestamp FROM transfer
    WHERE transfer.id IN (SELECT id FROM approve_transfer WHERE approve_transfer.id = id)
    UNION ALL
    -- transfer to --
    SELECT tick, to as address, 1 as transactions, 0 as mint_amt, timestamp, Null as mint_timestamp FROM transfer
    WHERE transfer.id IN (SELECT id FROM approve_transfer WHERE approve_transfer.id = id)
)
GROUP BY tick