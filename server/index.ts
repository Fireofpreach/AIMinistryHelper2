import express from "express";
import * as registerRoutes from "./routes.js";

console.log("registerRoutes =", registerRoutes);
console.log("registerRoutes.default =", registerRoutes.default);

async function main() {
  try {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(registerRoutes.default);

    // List registered routes for debugging
    console.log("=== All registered routes and middleware ===");
    if ((app as any)._router && (app as any)._router.stack) {
      (app as any)._router.stack.forEach((middleware: any) => {
        if (middleware.route) {
          const methods = Object.keys(middleware.route.methods).join(',').toUpperCase();
          console.log(`Route: ${methods} ${middleware.route.path}`);
        }
      });
    } else {
      console.log("No app._router.stack found; is Express set up correctly?");
    }

    const port = 5000;
    app.listen(port, "0.0.0.0", () => {
      console.log(`Serving on port ${port}`);
    });
  } catch (error) {
    console.error("Fatal startup error:", error);
    process.exit(1);
  }
}

main();
