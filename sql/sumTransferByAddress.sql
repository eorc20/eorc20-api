SELECT
    lower({address: String}) as address,
    last_value(p) as p,
    last_value(op) as op,
    tick,
    from,
    to,
    sum(amt) as amt,
    IF (from == address, -amt, amt) as balance_change,
    count(*) transactions,
    first_value(timestamp) as first_timestamp,
    last_value(timestamp) as last_timestamp,
    first_value(block_number) as first_block_number,
    last_value(block_number) as last_block_number
FROM transfer
WHERE id IN (SELECT id FROM approve WHERE op = 'transfer' AND approve.id = id) AND
transfer.from = address OR transfer.to = address
GROUP BY (from, to, tick)