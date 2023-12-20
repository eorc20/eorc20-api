SELECT
    last_value(from) as address,
    sum(toUInt64(mint.amt)) as amount,
    last_value(mint.timestamp) as last_updated,
    tick,
    first_value(deploy.timestamp) as tick_created,
    first_value(deploy.id) as tick_id
FROM mint
INNER JOIN deploy
ON deploy.tick = mint.tick AND deploy.lim = mint.amt AND mint.from = '0x413d069295a50db188d8eaa29973e2866bbcbc03'
GROUP BY (from, tick)
ORDER BY amount DESC;