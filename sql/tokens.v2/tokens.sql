SELECT
    address,
    tick,
    sum(amount) as amount,
    sum(mint_from) as mint_from,
    sum(transfer_from) as transfer_from,
    sum(transfer_to) as transfer_to,
    sum(transactions) as transactions,
    min(timestamp) as first_timestamp,
    max(timestamp) as last_timestamp,
    (amount / last_value(max_supply)) as percentage
FROM (
    -- mint --
    SELECT tick, from as address, transactions, amt as amount, last_timestamp as timestamp, amt as mint_from, 0 as transfer_from, 0 as transfer_to, (SELECT max FROM deploy WHERE deploy.tick = tick LIMIT 1) as max_supply FROM mint_sum_mv
    WHERE mint_sum_mv.from = lower({address: String})
    UNION ALL
    -- transfer from --
    SELECT tick, from as address, 1 as transactions, -amt as amount, timestamp, 0 as mint_from, amt as transfer_from, 0 as transfer_to, (SELECT max FROM deploy WHERE deploy.tick = tick LIMIT 1) as max_supply FROM transfer
    WHERE transfer.id IN (SELECT id FROM approve_transfer WHERE approve_transfer.id = id) AND transfer.from = lower({address: String}) AND block_number <= {block_number: Int}
    UNION ALL
    -- transfer to --
    SELECT tick, to as address, 1 as transactions, amt as amount, timestamp, 0 as mint_from, 0 as transfer_from, amt as transfer_to, (SELECT max FROM deploy WHERE deploy.tick = tick LIMIT 1) as max_supply FROM transfer
    WHERE transfer.id IN (SELECT id FROM approve_transfer WHERE approve_transfer.id = id) AND transfer.to = lower({address: String}) AND block_number <= {block_number: Int}
)
GROUP BY (address, tick)
ORDER BY last_timestamp DESC