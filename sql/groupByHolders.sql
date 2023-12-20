SELECT
    last_value(from) as address,
    tick,
    sum(toUInt64(mint.amt) / toUInt64(deploy.max)) as percentage,
    sum(toUInt64(mint.amt)) as amount
FROM mint
INNER JOIN deploy
ON deploy.tick = mint.tick AND deploy.lim = mint.amt
GROUP BY (from, tick)
ORDER BY amount DESC
LIMIT 500;
