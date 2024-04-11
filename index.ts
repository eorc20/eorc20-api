#!/usr/bin/env node

import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { Hono } from 'hono'
import { Address } from "viem";
import { supply } from './sql/supply/supply.js'
// import { holders } from './sql/holders/holders.js'
import { holdersV2 } from './sql/holders.v2/holders.js'
import { inscription } from './sql/inscription/inscription.js'
import { tokensV2 } from './sql/tokens.v2/tokens.js'
import { balance } from './sql/balance/balance.js'
import { openapi } from './src/openapi.js';
import swaggerHtml from "./swagger/index.html";
import swaggerFavicon from "./swagger/favicon.png";
import { Cache } from './src/cache.js';
import { info } from './sql/inscription/info/info.js';

const app = new Hono()
const cache = new Cache(60); // default 60 seconds cache
app.use('/*', cors(), logger())

app.get('/supply', async (c) => {
    const url = c.req.url;
    const cached = cache.get(url);
    if ( cached ) return c.json(cached);
    const {searchParams} = new URL(url)
    const ticks = (searchParams.get('tick') ?? "eoss").split(",")
    const response = await supply(ticks)
    cache.set(url, response);
    return c.json(response);
})

app.get('/inscription', async (c) => {
    const {searchParams} = new URL(c.req.url)
    const owner = searchParams.get('owner') ?? '';
    const limit = parseInt(searchParams.get('limit') ?? "500");
    const offset = parseInt(searchParams.get('offset') ?? "0")
    const response = await inscription(owner, limit, offset);
    return c.json(response);
})

app.get('/inscription/info', async (c) => {
    const {searchParams} = new URL(c.req.url)
    const transaction_hash = searchParams.get('transaction_hash');
    if (!transaction_hash) return c.json({ error: 'transaction_hash is required' });
    const response = await info(transaction_hash);
    return c.json(response);
})

app.get('/holders', async (c) => {
    const url = c.req.url;
    const cached = cache.get(url);
    if ( cached ) return c.json(cached);
    const {searchParams} = new URL(url)
    const tick = searchParams.get('tick') ?? "eoss"
    const limit = parseInt(searchParams.get('limit') ?? "500");
    const offset = parseInt(searchParams.get('offset') ?? "0")
    const response = await holdersV2(tick, limit, offset);
    cache.set(url, response);
    return c.json(response);
})

app.get('/tokens', async (c) => {
    const {searchParams} = new URL(c.req.url)
    const address = searchParams.get('address') as Address | null
    if (!address) return c.json({ error: 'address is required' });
    const block_number = parseInt(searchParams.get('block_number') ?? "9999999999999");
    if ( !block_number ) return c.json({error: 'block_number is required'});
    const response = await tokensV2(address, block_number)
    return c.json(response);
})

app.get('/balance', async (c) => {
    const {searchParams} = new URL(c.req.url)
    const address = searchParams.get('address') as Address | null
    if ( !address ) return c.json({error: 'address is required'});
    const tick = searchParams.get('tick') ?? "eoss"
    if ( !tick ) return c.json({error: 'tick is required'});
    const block_number = searchParams.get('block_number')
    if ( !block_number ) return c.json({error: 'block_number is required'});
    const response = await balance(address, tick, Number(block_number));
    return c.json(response);
})

app.get('/', async (c) => {
    return new Response(Bun.file(swaggerHtml));
})

app.get('/favicon.png', async () => {
    return new Response(Bun.file(swaggerFavicon));
})

app.get('/openapi', async (c) => {
    return c.json(JSON.parse(await openapi()));
})

export default app