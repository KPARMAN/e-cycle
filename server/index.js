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

  // Serve static files from dist (production only)
  const distPath = path.join(__dirname, "../dist/spa");
  try {
    app.use(express.static(distPath));
  } catch (e) {
    // Static files not available in dev mode
  }

  // SPA catch-all: serve index.html for all non-API routes (production only)
  app.use((_req, res) => {
    const indexPath = path.join(__dirname, "../dist/spa/index.html");
    res.sendFile(indexPath, (err) => {
      if (err) {
        // In dev mode, Vite handles routing, so this shouldn't be reached
        res.status(404).send("Not found");
      }
    });
  });

  return app;
}
