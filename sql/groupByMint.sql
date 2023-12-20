SELECT
    tick,
    sum(amt) as active_supply,
    uniq(id) as transactions,
    uniq(from) as holders,
    last_value(timestamp) as last_timestamp,
    last_value(block_number) as last_block_number
FROM mint
WHERE amt = 10000
GROUP BY (tick)
ORDER BY active_supply DESC