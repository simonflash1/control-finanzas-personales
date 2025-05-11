
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        // Enable HMR with proper WebSocket configuration
        overlay: true,
        clientPort: 8080, // Match the server port
        timeout: 120000, // Increase timeout to 2 minutes
        // Disable WebSocket protocol check that's causing the __WS_TOKEN__ error
        protocol: 'ws',
        host: 'localhost',
      },
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      // Define WebSocket token to prevent the reference error
      __WS_TOKEN__: JSON.stringify("development-ws-token"),
    }
  };
});
