#!/usr/bin/env node

import { cors } from 'hono/cors'
import { Hono } from 'hono'
import { Address } from "viem";
import { supply } from './sql/supply/supply.js'
import { holders } from './sql/holders/holders.js'
import { tokens } from './sql/tokens/tokens.js'
import { balance } from './sql/balance/balance.js'
import swaggerHtml from "./swagger/index.html";
import swaggerFavicon from "./swagger/favicon.png";
import { file } from 'bun';
import { openapi } from './src/openapi.js';

const app = new Hono()
app.use('/*', cors())
app.get('/supply', async (c) => {
    const response = await supply()
    return c.json(response);
})

app.get('/holders', async (c) => {
    const response = await holders()
    return c.json(response);
})

app.get('/tokens', async (c) => {
    const {searchParams} = new URL(c.req.url)
    const address = searchParams.get('address') as Address | null
    if ( !address ) return c.json({error: 'address is required'});
    const response = await tokens(address)
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
    return new Response(file(swaggerHtml));
})

app.get('/favicon.png', async () => {
    return new Response(file(swaggerFavicon));
})

app.get('/openapi', async (c) => {
    return c.json(JSON.parse(await openapi()));
})

export default app