import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
   server: {
    host: "localhost",
    port: 5174, 
    hmr: {
      protocol: "ws",
      host: "localhost",
      port: 5174,
      clientPort: 5174,  
    },
  },
}
);
