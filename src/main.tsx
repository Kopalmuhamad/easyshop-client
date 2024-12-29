import "./index.css";
import Router from "./routes/router.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./providers/theme-provider.tsx";
import { Toaster } from "./components/atoms/toaster.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux"; // Pastikan impor ini benar
import { store } from "./store/store.ts";

const queryClient = new QueryClient();

const App = () => {
  return (
    <StrictMode>
      <Toaster />
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Router />
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </StrictMode>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
