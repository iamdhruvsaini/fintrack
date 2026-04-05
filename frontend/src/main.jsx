import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes.jsx";

createRoot(document.getElementById("root")).render(
  <TooltipProvider>
    <RouterProvider router={router}>
        <App />
    </RouterProvider>
  </TooltipProvider>
);
