import { file } from "bun";
import swaggerFavicon from "../../swagger/favicon.png";
import swaggerHtml from "../../swagger/index.html";
import { NotFound, toFile, toJSON } from "./cors.js";
import { openapi } from "./openapi.js";
import health from "./health.js";
import { metrics } from "../prometheus.js";
import { groupBySupply } from "../../sql/groupBySupply.js";

export default async function (req: Request) {
  const { pathname } = new URL(req.url);

  if (pathname === "/") return toFile(file(swaggerHtml));
  if (pathname === "/favicon.png") return toFile(file(swaggerFavicon));
  if (pathname === "/health") return health();
  if (pathname === "/metrics") return metrics();
  if (pathname === "/openapi") return toJSON(await openapi());
  if (pathname === "/supply") return toJSON(await groupBySupply());
  // if (pathname === "/supply") return toJSON(await groupBySupply());

  return NotFound;
}