import path from "node:path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js"
import dts from "vite-plugin-dts"

export default defineConfig({
  plugins: [
    vue(),
    cssInjectedByJsPlugin(),
    dts({
      rollupTypes: true,
      insertTypesEntry: true, // generates "types" entry in package.json
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/entry.ts"),
      name: "VueTailwindDatepicker",
      fileName: (format) => `vue-tailwind-datepicker.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["vue"],
      output: {
        globals: {
          vue: "Vue",
        },
      },
    },
  },
})