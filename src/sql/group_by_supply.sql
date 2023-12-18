SELECT
  tick,
  first_value(p) as protocol,
  first_value(operations_deploy.timestamp) as deploy_timestamp,
  last_value(block_number) as last_block_number,
  last_value(timestamp) as last_timestamp,
  count(owner) as holders,
  sum(amt) as active_supply,
  first_value(max) as max_supply,
  (sum(amt) / first_value(max)) as progress,
  count(*) as transactions
FROM operations_mint
INNER JOIN operations_deploy
ON operations_deploy.tick = operations_mint.tick
GROUP BY tick
