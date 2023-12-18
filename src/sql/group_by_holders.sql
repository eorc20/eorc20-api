-- group token holders by ticker --
SELECT
  tick
  owner,
  sum(amt) as tokens
FROM operations_mint
WHERE tick='eoss'
GROUP BY (owner, tick)
ORDER BY tokens DESC;