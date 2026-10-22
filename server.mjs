// Servidor independiente (Node 20+) para un dominio y hosting propios.
// Uso:  node server.mjs        Variables: PORT, DATA_DIR, PASSWORD_PEPPER, SHEET_ID, SHEET_TAB
import http from "node:http";
import { readFile, writeFile, mkdir, readdir, unlink } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { handleRequest } from "./netlify/functions/core.mjs";
import { store as redisStore } from "./api/storage.mjs";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.resolve(process.env.DATA_DIR || path.join(ROOT, "data"));
const PORT = Number(process.env.PORT || 8080);
const enc = (k) => Buffer.from(k).toString("base64url");
const dec = (f) => Buffer.from(f, "base64url").toString();

const diskStore = {
  async get(k, o) { try { const v = await readFile(path.join(DATA, enc(k)), "utf8"); return o?.type === "json" ? JSON.parse(v) : v; } catch { return null; } },
  async set(k, v) { await mkdir(DATA, { recursive: true }); await writeFile(path.join(DATA, enc(k)), v); },
  async setJSON(k, v) { await this.set(k, JSON.stringify(v)); },
  async keys(prefix) { try { return (await readdir(DATA)).map(dec).filter((k) => k.startsWith(prefix)); } catch { return []; } },
  async del(k) { try { await unlink(path.join(DATA, enc(k))); } catch {} },
};

const useRedis = Boolean((process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL) && (process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN));
const store = useRedis ? redisStore() : diskStore;
if (!useRedis) console.warn("ATENCION: almacenamiento local. Configura un disco persistente en Render o Redis externo.");

const SEC = {
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains; preload",
  "X-Content-Type-Options": "nosniff", "X-Frame-Options": "DENY", "Referrer-Policy": "same-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Content-Security-Policy": "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self'; worker-src 'self' blob: https://cdnjs.cloudflare.com; frame-ancestors 'none'",
};
const MIME = { ".svg":"image/svg+xml", ".webp":"image/webp", ".jpg":"image/jpeg", ".jpeg":"image/jpeg", ".woff2":"font/woff2", ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".png": "image/png", ".json": "application/json", ".ico": "image/x-icon" };

http.createServer(async (rq, rs) => {
  try {
    const url = new URL(rq.url, "http://x");
    if (url.pathname === "/healthz") { rs.writeHead(200, {"Content-Type":"application/json"}); return rs.end(JSON.stringify({status:"ok", storage:useRedis?"redis":"disk"})); }
    if (url.pathname === "/api/epe") {
      const chunks = []; for await (const c of rq) chunks.push(c);
      const req = new Request("http://x/api/epe", { method: rq.method, headers: rq.headers, body: rq.method === "POST" ? Buffer.concat(chunks) : undefined });
      const r = await handleRequest(req, store);
      rs.writeHead(r.status, { ...Object.fromEntries(r.headers), ...SEC });
      return rs.end(Buffer.from(await r.arrayBuffer()));
    }
    const rel = url.pathname === "/" ? "index.html" : url.pathname.slice(1);
    const file = path.resolve(ROOT, "public", rel);
    if (!(file === path.join(ROOT, "public") || file.startsWith(path.join(ROOT, "public") + path.sep))) { rs.writeHead(403); return rs.end(); }
    const body = await readFile(file);
    rs.writeHead(200, { "Content-Type": MIME[path.extname(file)] || "application/octet-stream", ...SEC });
    rs.end(body);
  } catch { rs.writeHead(404, SEC); rs.end("No encontrado"); }
}).listen(PORT, () => console.log(`EMPRENDE en http://localhost:${PORT}  (datos en ${DATA})`));
