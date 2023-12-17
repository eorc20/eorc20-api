#!/usr/bin/env node

import { PORT } from "../src/config.js";
import GET from "../src/fetch/GET.js";
import OPTIONS from "../src/fetch/OPTIONS.js";
import POST from "../src/fetch/POST.js";
import { NotFound } from "../src/fetch/cors.js";

const app = Bun.serve({
  port: PORT,
  fetch(req: Request) {
    if (req.method === "GET") return GET(req);
    if (req.method === "POST") return POST(req);
    if (req.method === "OPTIONS") return OPTIONS(req);
    return NotFound;
  },
});

console.log(`Server listening on http://${app.hostname}:${app.port}`);
