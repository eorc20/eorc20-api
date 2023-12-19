import { CORS_HEADERS } from "./cors.js";

export default async function (req: Request) {
  return new Response("Departed", { status: 204, headers: CORS_HEADERS });
}