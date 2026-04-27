const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const portArgIndex = process.argv.indexOf("--port");
const port = Number(process.argv[portArgIndex + 1]) || Number(process.env.PORT) || 4173;

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8"
};

function safePath(urlPath) {
  const decoded = decodeURIComponent(urlPath.split("?")[0]);
  const normalized = path.normalize(decoded).replace(/^(\.\.[/\\])+/, "");
  return path.join(root, normalized);
}

const server = http.createServer((req, res) => {
  let filePath = safePath(req.url);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, "index.html");
  }

  if (!fs.existsSync(filePath)) {
    filePath = path.join(root, "404.html");
    res.statusCode = 404;
  }

  const ext = path.extname(filePath);
  res.setHeader("Content-Type", types[ext] || "application/octet-stream");
  fs.createReadStream(filePath).pipe(res);
});

server.listen(port, () => {
  console.log(`Serving Malcolm Hasman redesign at http://localhost:${port}`);
});
