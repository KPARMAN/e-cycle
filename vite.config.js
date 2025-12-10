import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server/index.js";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  appType: "spa",
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

      // Mount Express app only for API routes (/api/*)
      // This prevents Express from intercepting SPA routes like /dashboard
      server.middlewares.use("/api", app);

      // SPA fallback: serve index.html for all non-API routes
      // This allows React Router to handle client-side routing
      return () => {
        server.middlewares.use((req, res, next) => {
          // Skip API routes
          if (req.url.startsWith("/api")) {
            return next();
          }
          // Skip static assets
          if (req.url.match(/\.(js|css|json|png|jpg|jpeg|gif|svg|ico|woff|woff2|ttf|eot)$/i)) {
            return next();
          }
          // Serve index.html for all other requests (SPA routing)
          req.url = "/index.html";
          next();
        });
      };
    },
  };
}
