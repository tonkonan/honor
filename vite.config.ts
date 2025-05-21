import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",           // позволяет работать и с localhost, и с внешним IP
    port: 8080,
    proxy: {
      // когда backend появится — запросы /api будут проксироваться
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
