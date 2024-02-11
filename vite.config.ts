import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
    server: {
        hmr: {
            port: 3001
        }
    },
    plugins: [sveltekit()],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@use "./src/sass/_variables.scss" as *;',
            },
        },
    },
});
