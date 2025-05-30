import express, { type Request, Response, NextFunction } from "express";
import registerRoutes from "./routes.js";
import { setupVite, serveStatic, log } from "./vite.js";
import path from "path";

async function main() {
  try {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use((req: Request, res: Response, next: NextFunction) => {
      const start = Date.now();
      const pathReq = req.path;
      let capturedJsonResponse: Record<string, any> | undefined = undefined;

      const originalResJson = res.json;
      res.json = function (bodyJson, ...args) {
        capturedJsonResponse = bodyJson;
        return originalResJson.apply(res, [bodyJson, ...args]);
      };

      res.on("finish", () => {
        const duration = Date.now() - start;
        if (pathReq.startsWith("/api")) {
          let logLine = `${req.method} ${pathReq} ${res.statusCode} in ${duration}ms`;
          if (capturedJsonResponse) {
            logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
          }

          if (logLine.length > 80) {
            logLine = logLine.slice(0, 79) + "…";
          }

          log(logLine);
        }
      });

      next();
    });

    // Register routes as middleware (assuming registerRoutes is a middleware)
    app.use(registerRoutes);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      res.status(status).json({ message });
      // Log the error for visibility
      log(`Error: ${message}`);
      console.error(err);
    });

    const port = 5000;
    const server = app.listen(
      port,
      "0.0.0.0",
      async () => {
        log(`serving on port ${port}`);

        if (process.env.NODE_ENV !== "production") {
          // Only use setupVite in development!
          await setupVite(app, server);
        } else {
          // Serve static files and fallback for production builds
          serveStatic(app);
        }
      }
    );
  } catch (error) {
    console.error("Fatal startup error:", error);
    process.exit(1);
  }
}

main();
