import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css"; // your Tailwind + variables CSS
import { ThemeProvider } from "@/components/ui/theme-provider"; // ensure alias works

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="light" storageKey="shepherd-theme">
    <App />
  </ThemeProvider>
);
