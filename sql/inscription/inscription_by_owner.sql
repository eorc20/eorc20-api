SELECT id, from, to, p, op, tick, amt, block_number, timestamp, error_code, status
FROM (
    -- approved transfers --
    SELECT id, from, to, p, op, tick, amt, block_number, timestamp, 0 as error_code, 'success' as status
    FROM transfer_to_mv
    WHERE id IN (SELECT id FROM approve_transfer) AND to = lower({owner: String})
    LIMIT {limit: Int}
    UNION ALL

    -- error transfers
    SELECT id, from, to, p, op, tick, amt, block_number, timestamp, code as error_code, 'error' as status
    FROM transfer_to_mv
    JOIN errors_transfer ON transfer_to_mv.id = errors_transfer.id AND to = lower({owner: String})
    LIMIT {limit: Int}
    UNION ALL

    -- approved mints --
    SELECT id, from, to, p, op, tick, amt, block_number, timestamp, -1 as error_code, 'unknown' as status
    FROM mint_from_mv
    WHERE from = lower({owner: String})
    LIMIT {limit: Int}
    UNION ALL

    -- error mints
    SELECT id, from, to, p, op, tick, amt, block_number, timestamp, -1 as error_code, 'unknown' as status
    FROM mint_from_mv
    WHERE from = lower({owner: String})
    LIMIT {limit: Int}
)
ORDER BY timestamp DESC
LIMIT {limit: Int}