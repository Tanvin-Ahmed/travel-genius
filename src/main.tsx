import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./components/router/Router.tsx";
import { ThemeProvider } from "./components/custom/provider/theme-provider.tsx";
import { Toaster } from "./components/ui/toaster.tsx";
import AuthContextProvider from "./context/auth-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster />
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </ThemeProvider>
  </StrictMode>
);
