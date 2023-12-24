SELECT
    lower({address: String}) as address,
    lower({tick: String}) as tick,
    amt,
    transactions
FROM mint_sum_mv
WHERE mint_sum_mv.from = address AND mint_sum_mv.tick = tick