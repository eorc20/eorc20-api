SELECT
    from as address,
    tick,
    amt as amount,
    (SELECT max FROM deploy WHERE deploy.tick = tick LIMIT 1) as max_supply,
    (amt / max_supply) as percentage
FROM mint_sum_mv
WHERE tick = 'eoss'
ORDER BY amount DESC
LIMIT 500;
