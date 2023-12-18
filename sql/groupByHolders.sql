-- group token holders by ticker --
SELECT
    owner,
    tick,
    sum(amt) as tokens
FROM operations_mint
INNER JOIN operations_deploy
ON operations_deploy.tick = operations_mint.tick
GROUP BY (owner, tick)
ORDER BY tokens DESC;
