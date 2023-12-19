import { file } from "bun";
import swaggerFavicon from "../../swagger/favicon.png";
import swaggerHtml from "../../swagger/index.html";
import { BadRequest, NotFound, toFile, toJSON } from "./cors.js";
import { openapi } from "./openapi.js";
import health from "./health.js";
import { metrics } from "../prometheus.js";
import { groupBySupply } from "../../sql/groupBySupply.js";
import { groupByHolders } from "../../sql/groupByHolders.js";
import { groupTokensByAddress } from "../../sql/groupTokensByAddress.js";
import { Address } from "viem";

export default async function (req: Request) {
  const { pathname, searchParams } = new URL(req.url);
  const address = searchParams.get("address") as Address | null;

  // internal
  if (pathname === "/") return toFile(file(swaggerHtml));
  if (pathname === "/favicon.png") return toFile(file(swaggerFavicon));
  if (pathname === "/health") return health();
  if (pathname === "/metrics") return metrics();
  if (pathname === "/openapi") return toJSON(await openapi());

  // endpoints
  if (pathname === "/supply") return toJSON(await groupBySupply());
  if (pathname === "/holders") return toJSON(await groupByHolders());
  if (pathname === "/tokens") {
    if ( address ) return toJSON(await groupTokensByAddress(address));
    else return BadRequest("[address] is required as search params");
  }

  return NotFound;
}