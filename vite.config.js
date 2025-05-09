import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [
        laravel({
            input: "resources/js/app.tsx",
            ssr: "resources/js/ssr.tsx",
            refresh: true,
        }),
        react(),
    ],
    server: {
        host: "0.0.0.0",
        origin: `${process.env.DDEV_PRIMARY_URL.replace(/:\d+$/, "")}:5173`,
        cors: {
            origin: /https?:\/\/([A-Za-z0-9\-\.]+)?(\.test)(?::\d+)?$/,
        },
    },
});
