SELECT
    last_value(from_address) as address,
    tick,
    sum(toUInt64(mint.amt) / toUInt64(deploy.max)) as percentage,
    sum(toUInt64(mint.amt)) as amount
FROM mint
INNER JOIN deploy
ON deploy.tick = mint.tick AND deploy.lim = mint.amt
GROUP BY (from_address, tick)
ORDER BY amount DESC
LIMIT 500;
