SELECT
    tick,
    from,
    sum(amt) as amt
FROM transfer
WHERE id IN (SELECT id FROM approve WHERE op = 'transfer' AND approve.id = id) AND
transfer.from = from AND
tick = 'eoss'
GROUP BY (from, tick)