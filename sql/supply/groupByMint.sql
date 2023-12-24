SELECT
    tick,
    sum(amt) as active_supply,
    sum(transactions) as transactions,
    uniq(from) as holders,
    last_value(first_timestamp) as first_timestamp,
    last_value(last_timestamp) as last_timestamp
FROM mint_sum_mv
GROUP BY (tick)
ORDER BY active_supply DESC