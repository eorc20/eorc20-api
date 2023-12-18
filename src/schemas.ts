import { Type, Static } from "@sinclair/typebox";

export const TokensPayload = Type.Object({
    address: Type.Optional(Type.String({example: "0x0fb3e4662065c27bac8fbdfb8f1731c3293fdc09"})),
    page: Type.Optional(Type.Number({example: 1})),
    pageSize: Type.Optional(Type.Number({example: 12})),
    tick: Type.Optional(Type.String({example: "eoss"})),
})

export type TokensPayload = Static<typeof TokensPayload>

export const TokensListItem = Type.Object({
    amount: Type.String({example: "10000"}),
    tick: Type.String({example: "eoss"}),
    number: Type.Number({example: 22126343}),
    precision: Type.Number({example: 0}),
    createdAt: Type.Number({example: 1700888064}),
})

export type TokensListItem = Static<typeof TokensListItem>

export const TokensResponse = Type.Object({
    status: Type.Number({example: 200}),
    data: Type.Object({
        list: Type.Array(TokensListItem),
        count: Type.Number({example: 1}),
    }),
})

export type TokensResponse = Static<typeof TokensResponse>

export const InscriptionPayload = Type.Object({
    owner: Type.Optional(Type.String({example: "0x0fb3e4662065c27bac8fbdfb8f1731c3293fdc09"})),
    page: Type.Optional(Type.Number({example: 1})),
    pageSize: Type.Optional(Type.Number({example: 12})),
    tick: Type.Optional(Type.String({example: "eoss"})),
})

export type InscriptionPayload = Static<typeof InscriptionPayload>

export const InscriptionArrayItem = Type.Object({
    id: Type.String({example: "0x8c3adec69b79c036a21e7ccddf2ef387ef6ecde6a9bd7ef1b3d40c3fe1d399b1"}),
    number: Type.Number({example: 1032}),
    owner: Type.String({example: "0x50e6585875ad67ffa6bd44381d7a572bdbdfa0ae"}),
    block: Type.Number({example: 21443083}),
    timestamp: Type.Number({example: 1702104171}),
    protocol: Type.String({example: "eorc-20"}),
    contentType: Type.String({example: "text/plain"}),
    content: Type.String({example: "data:,{\"p\":\"eorc20\",\"op\":\"mint\",\"tick\":\"eoss\",\"amt\":\"10000\"}"}),
})

export const InscriptionResponse = Type.Object({
    status: Type.Number({example: 200}),
    data: Type.Array(InscriptionArrayItem),
})

export type InscriptionResponse = Static<typeof InscriptionResponse>

export const InscriptionRawData = Type.Object({
    id: Type.String({example: "0x8c3adec69b79c036a21e7ccddf2ef387ef6ecde6a9bd7ef1b3d40c3fe1d399b1"}),
    block: Type.Number({example: 21443083}),
    timestamp: Type.Number({example: 1702104171}),
    from: Type.String({example: "0x50e6585875ad67ffa6bd44381d7a572bdbdfa0ae"}),
    to: Type.String({example: "0x50e6585875ad67ffa6bd44381d7a572bdbdfa0ae"}),
    contentType: Type.String({example: "text/plain"}),
    content: Type.String({example: "data:,{\"p\":\"eorc20\",\"op\":\"mint\",\"tick\":\"eoss\",\"amt\":\"10000\"}"}),
    value: Type.Optional(Type.String({example: "0"})),
})

export type InscriptionRawData = Static<typeof InscriptionRawData>

export const TokenSupply = Type.Object({
    tick: Type.String({example: "eoss"}),
    protocol: Type.String({example: "eo"}),
    deploy_timestamp: Type.String({example: ""}),
    last_block_number: Type.String({example: ""}),
    last_timestamp: Type.String({example: ""}),
    holders: Type.String({example: ""}),
    active_supply: Type.String({example: ""}),
    max_supply: Type.String({example: ""}),
    transactions: Type.String({example: ""}),
    progress: Type.String({example: ""}),
})


// export const TickListItem = Type.Object({
//     amount: Type.String({example: "10000"}),
//     tick: Type.String({example: "eoss"}),
//     number: Type.Number({example: 22126343}),
//     precision: Type.Number({example: 0}),
//     createdAt: Type.Number({example: 1700888064}),
// })

// export type TickListItem = Static<typeof TickListItem>

// export const TickResponse = Type.Object({
//     status: Type.Number({example: 200}),
//     data: Type.Object({
//         id: Type.String(),              // 1
//         tick: Type.String(),            // "ethi"
//         amount: Type.Number(),          // "21000000"
//         max: Type.Number(),             // "21000000"
//         workc: Type.String(),           // ""
//         protocol: Type.String(),        // "IERC-20"
//         holder: Type.Number(),          // 5944
//         creator: Type.String(),         // "0xb3a6c05c1b795b08c9ed936478a244529eda20c0"
//         // json: Type.String(),            // "%7B%22p%22:%22terc-20%22%2C%22op%22:%22deploy%22%2C%22tick%22:%22ethi%22%2C%22max%22:%2221000000%22%2C%22lim%22:%221000%22%2C%22wlim%22:%2210000%22%2C%22dec%22:%228%22%2C%22nonce%22:%2210%22%7D"
//         // last_time: Type.String(),       // "1688819531"
//         // time: Type.String(),            // "1688202827"
//         decimals: Type.Number(),        // 8
//         created_at: Type.String(),      // "2023-11-08T06:45:32Z"
//         updated_at: Type.String(),      // "2023-11-08T06:56:19Z"
//     }),
// })

// export type TickResponse = Static<typeof TickResponse>