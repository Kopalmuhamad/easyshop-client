import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Router from "./routes/router.tsx";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import { Toaster } from "./components/atoms/toaster.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <StrictMode>
      <Toaster />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Router />
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
