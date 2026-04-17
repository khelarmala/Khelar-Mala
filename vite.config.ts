import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "esnext",
    // Raise chunk warning threshold — we're intentionally splitting
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // ── Manual chunk splitting strategy ────────────────────────────────
        // Goal: keep initial JS load lean by extracting large / rarely-changed
        // third-party libraries into their own cached chunks.
        manualChunks: (id: string) => {
          // Framer Motion — large, changes rarely, doesn't need to block initial render
          if (id.includes("framer-motion")) return "vendor-framer";
          // Radix UI + shadcn — all UI primitives in one cacheable chunk
          if (id.includes("@radix-ui")) return "vendor-radix";
          // React core + router — always needed, keep together
          if (id.includes("react-router-dom") || id.includes("react-dom")) return "vendor-react";
          // Form handling libs — only needed on Contact page
          if (id.includes("react-hook-form") || id.includes("@hookform") || id.includes("zod")) return "vendor-forms";
          // Helmet (SEO) — small but always needed
          if (id.includes("react-helmet-async")) return "vendor-helmet";
          // Lucide icons — medium size, used everywhere
          if (id.includes("lucide-react")) return "vendor-icons";
        },
      },
    },
  },
  // Optimize dev server
  server: {
    host: true,
    port: 3000,
    strictPort: false,
  },
  // Optimise dependencies pre-bundling
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "framer-motion"],
  },
});