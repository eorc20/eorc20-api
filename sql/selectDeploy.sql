SELECT
    tick,
    from as deploy_address,
    timestamp as deploy_timestamp,
    block_number as deploy_block_number,
    max as max_supply,
    lim as limit_by_amount,
    p as protocol
FROM deploy ORDER BY block_number