import { UserConfigExport, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";
import { viteVConsole } from "vite-plugin-vconsole";
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
  return {
    base: "./",
    plugins: [
      vue(),
      Components({
        resolvers: [VantResolver()],
      }),
      AutoImport({
        /* options */
        imports: ["vue", "vue-router"],
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
        ],
      }),
      // 配置vconsole生产环境不启用
      viteVConsole({
        entry: [resolve("src/main.ts")], // 入口文件
        localEnabled: command === "serve", // serve开发环境下
        enabled: command === "serve" || mode === "test", // 打包环境下/发布测试包
        config: {
          // vconsole 配置项
          maxLogNumber: 1000,
          theme: "light",
        },
      }),
    ],
    resolve: {
      alias: [
        {
          find: "@",
          replacement: resolve(__dirname, "./src"),
        },
        {
          find: "#",
          replacement: resolve(__dirname, "./src/components"),
        },
      ],
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:8080",
          changeOrigin: false,
          // rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
      host: true,
    }
  };
};
