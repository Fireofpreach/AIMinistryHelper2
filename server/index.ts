import express, { type Request, Response, NextFunction } from "express";
import registerRoutes from "./routes.js";
import { setupVite, serveStatic, log } from "./vite.js";
import path from "path";

async function main() {
  try {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Logging middleware for /api requests
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

    // Register your API routes here
    app.use(registerRoutes);

    // Error handling middleware
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ message });
      log(`Error: ${message}`);
      console.error(err);
    });

    // List registered routes and middleware for debugging
    console.log("=== All registered routes and middleware ===");
    if (app._router && app._router.stack) {
      app._router.stack.forEach((middleware: any) => {
        if (middleware.route) {
          const methods = Object.keys(middleware.route.methods).join(',').toUpperCase();
          console.log(`Route: ${methods} ${middleware.route.path}`);
        } else if (middleware.name === 'router' && middleware.handle && middleware.handle.stack) {
          middleware.handle.stack.forEach((handler: any) => {
            if (handler.route) {
              const methods = Object.keys(handler.route.methods).join(',').toUpperCase();
              console.log(`Router: ${methods} ${handler.route.path}`);
            }
          });
        } else if (middleware.regexp && middleware.name !== "<anonymous>") {
          console.log(`Middleware: ${middleware.name} ${middleware.regexp}`);
        }
      });
    } else {
      console.log("No app._router.stack found; is Express set up correctly?");
    }

    const port = 5000;
    const server = app.listen(
      port,
      "0.0.0.0",
      async () => {
        log(`serving on port ${port}`);

        // Restore Vite/static serving as needed
        if (process.env.NODE_ENV !== "production") {
          await setupVite(app, server);
        } else {
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
