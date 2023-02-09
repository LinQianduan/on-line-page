import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import { resolve } from "path";
import vue from '@vitejs/plugin-vue'
import { wrapperEnv } from "./src/utils/getEnv";
import { createHtmlPlugin } from 'vite-plugin-html'
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig(({ mode }: ConfigEnv): UserConfig =>{
  const env = loadEnv(mode, process.cwd());
  const viteEnv = wrapperEnv(env);

  return {
    base: "./",
    resolve: {
			alias: {
				"@": resolve(__dirname, "./src"),
			},
      extensions: [".js", ".ts", ".tsx", ".jsx"]
		},
    server: {
      host: "0.0.0.0",
			port: viteEnv.VITE_PORT,
			open: viteEnv.VITE_OPEN,
    },
    css:{
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/var.scss";`
        },
      },
    },
    plugins: [
      vue(),
      createHtmlPlugin({
				inject: {
					data: {
						title: viteEnv.VITE_GLOB_APP_TITLE
					}
				}
			}),
      // * 使用 svg 图标
			createSvgIconsPlugin({
				iconDirs: [resolve(process.cwd(), "src/assets/svg")],
				symbolId: "icon-[dir]-[name]"
			}),
      // * name 可以写在 script 标签上
			VueSetupExtend(),
      // * vite 可以使用 jsx/tsx 语法
			vueJsx(),
      // ----element plus自动按需导入----
      // AutoImport({
      //   resolvers: [ElementPlusResolver()],
      //   // 配置文件生成位置
      //   dts: 'src/typings/auto-imports.d.ts'
      // }),
      // Components({
      //   resolvers: [ElementPlusResolver()],
      //   // 配置文件生成位置
      //   dts: 'src/typings/components.d.ts'
      // }),
      // -------------------------------
    ],
    // * 打包去除 console.log && debugger
    esbuild: {
			pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
		},
  }
})
