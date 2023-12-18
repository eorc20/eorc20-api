import pkg from "../../package.json" assert { type: "json" };

import { LicenseObject } from "openapi3-ts/oas30";
import { OpenApiBuilder, ResponsesObject } from "openapi3-ts/oas31";
import { InscriptionArrayItem, InscriptionPayload, InscriptionResponse, TokensPayload, TokensResponse } from "../schemas.js";
import { GroupBySupply, GroupBySupplyResponse } from "../../sql/groupBySupply.js";

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
            content: { "application/json": { schema: GroupBySupplyResponse }},
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