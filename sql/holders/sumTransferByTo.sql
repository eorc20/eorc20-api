SELECT
    tick,
    to,
    sum(amt) as amt
FROM transfer
WHERE id IN (SELECT id FROM approve_transfer WHERE approve_transfer.id = id) AND
transfer.to = to AND
tick = 'eoss'
GROUP BY (to, tick)