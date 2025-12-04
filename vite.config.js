import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server/index.js";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: {
      allow: [".","./client", "./shared"],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },
  build: {
    outDir: "dist/spa",
  },
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve("./client"),
      "@shared": path.resolve("./shared"),
    },
  },
}));

function expressPlugin() {
  return {
    name: "express-plugin",
    apply: "serve",
    configureServer(server) {
      const app = createServer();

      // Mount Express app for all requests
      server.middlewares.use(app);

      // Return middleware to serve index.html for SPA routing (catches 404s from unhandled routes)
      return () => {
        server.middlewares.use((_req, res) => {
          // If we get here, Vite's normal middleware didn't handle it
          // This handles client-side routing by serving index.html
          if (!res.headersSent && _req.method === "GET" && !_req.url.startsWith("/api")) {
            res.setHeader("Content-Type", "text/html");
            res.end(`<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body><div id="app"></div><script type="module" src="/client/main.jsx"></script></body>
</html>`);
          }
        });
      };
    },
  };
}
