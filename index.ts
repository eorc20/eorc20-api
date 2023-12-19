#!/usr/bin/env node

import { cors } from 'hono/cors'
import { Hono } from 'hono'
import { Address } from "viem";
import { groupBySupply } from './sql/groupBySupply.js'
import { groupByHolders } from './sql/groupByHolders.js'
import { groupTokensByAddress } from './sql/groupTokensByAddress.js'

const app = new Hono()
app.use('/*', cors())
app.get('/supply', async (c) => {
    const response = await groupBySupply()
    return c.json(response);
})

app.get('/holders', async (c) => {
    const response = await groupByHolders()
    return c.json(response);
})

app.get('/tokens', async (c) => {
    const {searchParams} = new URL(c.req.url)
    const address = searchParams.get('address') as Address | null
    if ( !address ) return c.json({error: 'address is required'});
    const response = await groupTokensByAddress(address)
    return c.json(response);
})

export default app