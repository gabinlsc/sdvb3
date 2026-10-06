"use strict";

const http = require("node:http");
const fs = require("node:fs/promises");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".svg": "image/svg+xml" };

http.createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    const filename = pathname === "/" ? "contact.html" : pathname.slice(1);
    const target = path.resolve(root, filename);
    const relative = path.relative(root, target);
    if (relative.startsWith("..") || path.isAbsolute(relative) || !types[path.extname(target)] || relative.split(path.sep).some((part) => part.startsWith(".")) || relative.split(path.sep).includes("node_modules")) {
      response.writeHead(404);
      response.end("Ressource introuvable");
      return;
    }
    const content = await fs.readFile(target);
    response.writeHead(200, { "Content-Type": types[path.extname(target)], "Cache-Control": "no-store" });
    response.end(content);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Cette page n’est pas encore disponible dans cette contribution.");
  }
}).listen(4173, "127.0.0.1", () => {
  console.log("Aperçu Contact : http://127.0.0.1:4173/contact.html (Ctrl+C pour arrêter)");
});
