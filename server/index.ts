import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import registerRoutes from "./routes.js";

// These two lines are for ES Module path resolution
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  try {
    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    // Serve static files from your frontend build
    app.use(express.static(path.join(__dirname, "../client/dist")));

    // Mount your API and app routes BEFORE the React catch-all
    app.use(registerRoutes);

    // For React Router: serve index.html for any unknown route
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });

    const port = process.env.PORT || 5000;
    app.listen(port, "0.0.0.0", () => {
      console.log(`Serving on port ${port}`);
    });
  } catch (error) {
    console.error("Fatal startup error:", error);
    process.exit(1);
  }
}

main();
