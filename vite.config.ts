import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ["48bb-197-32-36-116.ngrok-free.app"],
  },
});