import "dotenv/config";

// HTTP server
export const PORT = Number(process.env.PORT ?? "3000");

// Defaults
export const DEFAULT_HOST = "http://localhost:8123";
export const DEFAULT_DATABASE = "default";
export const DEFAULT_USERNAME = "default";
export const DEFAULT_PASSWORD = "";

// ClickHouse
export const HOST = process.env.HOST ?? DEFAULT_HOST;
export const PASSWORD = process.env.PASSWORD ?? DEFAULT_PASSWORD;
export const DATABASE = process.env.DATABASE ?? DEFAULT_DATABASE;