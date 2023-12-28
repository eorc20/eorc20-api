import pkg from "../package.json" assert { type: "json" };

import { LicenseObject } from "openapi3-ts/oas30";
import { OpenApiBuilder, ResponsesObject } from "openapi3-ts/oas31";
import { SupplyResponse } from "../sql/supply/supply.js";
import { HoldersV2Response } from "../sql/holders.v2/holders.js";
import { TokensResponse } from "../sql/tokens/tokens.js";

const TAGS = {
  USAGE: "Usage",
  MAINTENANCE: "Maintenance",
  QUERIES: "Queries",
  HEALTH: "Health",
  DOCS: "Documentation",
} as const;

const RESPONSES: ResponsesObject = {
  200: {
    description: "Success",
    content: { "text/plain": { example: "OK", schema: { type: "string" } } },
  },
  400: {
    description: "Bad request",
    content: { "text/plain": { example: "Bad request", schema: { type: "string" } } },
  },
  401: {
    description: "Unauthorized",
    content: { "text/plain": { example: "Unauthorized", schema: { type: "string" } } },
  },
};

export async function openapi() {
  return new OpenApiBuilder()
    .addInfo({
      title: "EORC-20 API indexer",
      version: pkg.version,
      description: pkg.description,
      license: {
        name: pkg.license,
        identifier: pkg.license,
        url: `${pkg.homepage}/blob/main/LICENSE`,
      } as LicenseObject,
    })
    .addExternalDocs({ url: pkg.homepage, description: "Extra documentation" })
    .addPath("/supply", {
      get: {
        tags: [TAGS.USAGE],
        summary: "Get tickers supply",
        responses: {
          200: {
            description: "List of ticker supply",
            content: { "application/json": { schema: SupplyResponse }},
          },
        },
      },
    })
    .addPath("/holders", {
      get: {
        tags: [TAGS.USAGE],
        parameters: [
          {
            name: "tick",
            in: "query",
            description: "Ticker",
            required: true,
            schema: { type: "string", example: "eoss", default: "eoss" },
          },
          {
            name: "limit",
            in: "query",
            description: "Limit rows to return",
            required: false,
            schema: { type: "number", example: 500, default: 500 },
          },
          {
            name: "offset",
            in: "query",
            description: "Offset rows to return",
            required: false,
            schema: { type: "number", example: 0, default: 0 },
          },
        ],
        summary: "Get all holders",
        responses: {
          200: {
            description: "List of token holders",
            content: { "application/json": { schema: HoldersV2Response }},
          },
        },
      },
    })
    .addPath("/tokens", {
      get: {
        tags: [TAGS.USAGE],
        parameters: [
          {
            name: "address",
            in: "query",
            description: "EOS EVM address",
            required: true,
            schema: { type: "string", example: "0x653ebe1666f1179b992e40c2a71859c01230d424" },
          },
        ],
        summary: "Get tokens from address",
        responses: {
          200: {
            description: "List of tokens from address",
            content: { "application/json": { schema: TokensResponse }},
          },
        },
      },
    })
    .addPath("/health", {
      get: {
        tags: [TAGS.HEALTH],
        summary: "Performs health checks and checks if the database is accessible",
        responses: { 200: RESPONSES[200] },
      },
    })
    .addPath("/metrics", {
      get: {
        tags: [TAGS.HEALTH],
        summary: "Prometheus metrics",
        responses: { 200: { description: "Prometheus metrics" } },
      },
    })
    .addPath("/openapi", {
      get: {
        tags: [TAGS.DOCS],
        summary: "OpenAPI specification",
        responses: {
          200: { description: "OpenAPI specification JSON", content: { "application/json": {} } },
        },
      },
    })
    .getSpecAsJson();
}