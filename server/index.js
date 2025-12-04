import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { handleDemo } from "./routes/demo.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Serve static files from dist
  const distPath = path.join(__dirname, "../dist/spa");
  app.use(express.static(distPath, { maxAge: "1h" }));

  // SPA catch-all: serve index.html for all non-API routes
  // This allows React Router to handle all client-side routes
  app.use((_req, res) => {
    const indexPath = path.join(__dirname, "../dist/spa/index.html");
    res.header("Cache-Control", "no-cache");
    res.sendFile(indexPath);
  });

  return app;
}
