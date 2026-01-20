/// <reference types="vitest/config" />
import locatorBabelPlugin from "@locator/babel-jsx";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins:
          process.env.NODE_ENV === "development"
            ? [
                [
                  locatorBabelPlugin,
                  {
                    env: "development",
                  },
                ],
              ]
            : [],
      },
    }),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],
      manifest: {
        name: "My App Name",
        short_name: "App Name",
        description: "My Awesome React App",
        theme_color: "#ffffff",
        icons: [
          {
            src: "Thumbnail.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "Thumbnail.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "Thumbnail.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      // 개발 환경에서도 PWA를 테스트하고 싶다면 true (기본값 false)
      devOptions: {
        enabled: true,
      },
    }),
  ],
  server: {
    host: true,
    port: 5174,
    strictPort: true,
    hmr: { clientPort: 5174 },
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          setupFiles: [".storybook/vitest.setup.ts"],
        },
      },
    ],
  },
});
