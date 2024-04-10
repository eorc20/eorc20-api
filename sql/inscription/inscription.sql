SELECT id, from, to, p, op, tick, amt, block_number, timestamp
FROM (
    SELECT id, from, to, p, op, tick, amt, block_number, timestamp
    FROM transfer_to_mv
    LIMIT {limit: Int}
    UNION ALL

    SELECT id, from, to, p, op, tick, amt, block_number, timestamp
    FROM mint_from_mv
    LIMIT {limit: Int}
)
ORDER BY timestamp DESC
LIMIT {limit: Int}