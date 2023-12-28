SELECT
    tick,
    from,
    sum(amt) as amt
FROM transfer
WHERE id IN (SELECT id FROM approve_transfer WHERE approve_transfer.id = id) AND
transfer.from = from AND
tick = {tick: String}
GROUP BY (from, tick)