SELECT
    tick,
    to,
    sum(amt) as amt
FROM transfer
WHERE id IN (SELECT id FROM approve WHERE op = 'transfer' AND approve.id = id) AND
transfer.to = to AND
tick = 'eoss'
GROUP BY (to, tick)