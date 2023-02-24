import { UserConfigExport, ConfigEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
import postcssPxToViewport from "postcss-px-to-viewport";
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
        "/xfj": {
          target: "http://localhost:8080",
          changeOrigin: false,
          // rewrite: (path) => path.replace(/^\/xfj/, ""),
        },
      },
      host: true,
    },
    css: {
      // preprocessorOptions: {
      //   scss: {
      //     additionalData: `@import '/src/style/index.scss';`,
      //   },
      // },
      postcss: {
        plugins: [
          postcssPxToViewport({
            viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
            unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
            viewportUnit: "vw", // 指定需要转换成的视窗单位，建议使用vw
            selectorBlackList: [], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
            minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
          }),
        ],
      },
    },
  };
};
