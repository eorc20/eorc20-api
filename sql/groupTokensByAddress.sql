SELECT
    last_value(from_address) as address,
    sum(toUInt64(mint.amt)) as amount,
    last_value(mint.timestamp) as last_updated,
    tick,
    first_value(deploy.timestamp) as tick_created,
    first_value(deploy.id) as tick_id
FROM mint
INNER JOIN deploy
ON deploy.tick = mint.tick AND deploy.lim = mint.amt AND mint.from_address = {address:String}
GROUP BY (from_address, tick)
ORDER BY amount DESC;