#!/usr/bin/env node

import { cors } from 'hono/cors'
import { Hono } from 'hono'
import { groupBySupply } from '../sql/groupBySupply'
import { groupByHolders } from '../sql/groupByHolders'
// import { groupTokensByAddress } from '../sql/groupTokensByAddress'

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

// app.get('/tokens', async (c) => {
//     const response = await groupByHolders()
//     return c.json(response);
// })

export default app