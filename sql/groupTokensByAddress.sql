SELECT
    tick,
    last_value(from) as address,
    sum(toUInt64(mint.amt)) as amount,
    last_value(mint.timestamp) as last_updated
FROM mint
WHERE tick = 'eoss' AND amt = 10000 AND block_number <= 21563992 AND from = {address: String}
GROUP BY tick;