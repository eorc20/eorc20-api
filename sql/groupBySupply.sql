SELECT
  tick,
  first_value(deploy.p) as protocol,
  first_value(deploy.id) as deploy_id,
  first_value(deploy.from) as deploy_address,
  first_value(deploy.timestamp) as deploy_timestamp,
  last_value(mint.block_number) as last_block_number,
  last_value(mint.timestamp) as last_timestamp,
  last_value(deploy.lim) as limit_per_mint,
  length(toString(limit_per_mint)) - 1 as decimal,
  uniq(mint.from) as holders,
  sum(mint.amt) as active_supply,
  first_value(deploy.max) as max_supply,
  uniq(mint.id) as transactions,
  toDecimal64((active_supply / max_supply), 3) as progress
FROM mint
JOIN deploy
ON deploy.tick = mint.tick AND mint.amt = deploy.lim AND mint.tick = 'eoss'
GROUP BY tick
