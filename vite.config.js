import { defineConfig } from "vite";

export default defineConfig({
  envPrefix: "NEXT_PUBLIC_",
  build: {
    rollupOptions: {
      input: ["index.html", "about.html", "contact.html", "project.html"],
    },
  },
});