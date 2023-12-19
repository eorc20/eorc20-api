SELECT
  tick,
  first_value(p) as protocol,
  first_value(deploy.from_address) as deploy_address,
  first_value(timestamp) as deploy_timestamp,
  last_value(block_number) as last_block_number,
  last_value(timestamp) as last_timestamp,
  uniq(from_address) as holders,
  sum(toUInt64(amt)) as active_supply,
  toUInt64(first_value(max)) as max_supply,
  uniq(mint.id) as transactions,
  (active_supply / max_supply) as progress
FROM mint
INNER JOIN deploy
ON deploy.tick = mint.tick AND deploy.lim = mint.amt
GROUP BY tick
