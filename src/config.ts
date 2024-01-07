import "dotenv/config";

// HTTP server
export const PORT = Number(process.env.PORT ?? "3000");

// Defaults
export const DEFAULT_CLICKHOUSE_HOST = "http://localhost:8123";
export const DEFAULT_CLICKHOUSE_DATABASE = "default";
export const DEFAULT_CLICKHOUSE_USERNAME = "default";
export const DEFAULT_CLICKHOUSE_PASSWORD = "";

// ClickHouse
export const CLICKHOUSE_HOST = process.env.CLICKHOUSE_HOST ?? process.env.HOST ?? DEFAULT_CLICKHOUSE_HOST;
export const CLICKHOUSE_PASSWORD = process.env.CLICKHOUSE_PASSWORD ?? process.env.PASSWORD ?? DEFAULT_CLICKHOUSE_PASSWORD;
export const CLICKHOUSE_DATABASE = process.env.CLICKHOUSE_DATABASE ?? process.env.DATABASE ?? DEFAULT_CLICKHOUSE_DATABASE;
