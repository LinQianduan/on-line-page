// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/Task/on-line-page/node_modules/vite/dist/node/index.js";
import { resolve } from "path";
import vue from "file:///D:/Task/on-line-page/node_modules/@vitejs/plugin-vue/dist/index.mjs";

// src/utils/getEnv.ts
function wrapperEnv(envConf) {
  const ret = {};
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT") {
      realName = Number(realName);
    }
    if (envName === "VITE_PROXY") {
      try {
        realName = JSON.parse(realName);
      } catch (error) {
      }
    }
    ret[envName] = realName;
    process.env[envName] = realName;
  }
  return ret;
}

// vite.config.ts
import { createHtmlPlugin } from "file:///D:/Task/on-line-page/node_modules/vite-plugin-html/dist/index.mjs";
import { createSvgIconsPlugin } from "file:///D:/Task/on-line-page/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import vueJsx from "file:///D:/Task/on-line-page/node_modules/@vitejs/plugin-vue-jsx/index.js";
import VueSetupExtend from "file:///D:/Task/on-line-page/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
var __vite_injected_original_dirname = "D:\\Task\\on-line-page";
var vite_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const viteEnv = wrapperEnv(env);
  return {
    base: "./",
    resolve: {
      alias: {
        "@": resolve(__vite_injected_original_dirname, "./src")
      },
      extensions: [".js", ".ts", ".tsx", ".jsx"]
    },
    server: {
      host: "0.0.0.0",
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/var.scss";`
        }
      }
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
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), "src/assets/svg")],
        symbolId: "icon-[dir]-[name]"
      }),
      VueSetupExtend(),
      vueJsx()
    ],
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL3V0aWxzL2dldEVudi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXFRhc2tcXFxcb24tbGluZS1wYWdlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxUYXNrXFxcXG9uLWxpbmUtcGFnZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovVGFzay9vbi1saW5lLXBhZ2Uvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcsIGxvYWRFbnYsIENvbmZpZ0VudiwgVXNlckNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcclxuaW1wb3J0IHsgd3JhcHBlckVudiB9IGZyb20gXCIuL3NyYy91dGlscy9nZXRFbnZcIjtcclxuaW1wb3J0IHsgY3JlYXRlSHRtbFBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWh0bWwnXHJcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSBcInZpdGUtcGx1Z2luLXN2Zy1pY29uc1wiO1xyXG5pbXBvcnQgdnVlSnN4IGZyb20gXCJAdml0ZWpzL3BsdWdpbi12dWUtanN4XCI7XHJcbmltcG9ydCBWdWVTZXR1cEV4dGVuZCBmcm9tIFwidml0ZS1wbHVnaW4tdnVlLXNldHVwLWV4dGVuZFwiO1xyXG5pbXBvcnQgQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xyXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xyXG5pbXBvcnQgeyBFbGVtZW50UGx1c1Jlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfTogQ29uZmlnRW52KTogVXNlckNvbmZpZyA9PntcclxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpO1xyXG4gIGNvbnN0IHZpdGVFbnYgPSB3cmFwcGVyRW52KGVudik7XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBiYXNlOiBcIi4vXCIsXHJcbiAgICByZXNvbHZlOiB7XHJcblx0XHRcdGFsaWFzOiB7XHJcblx0XHRcdFx0XCJAXCI6IHJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjXCIpLFxyXG5cdFx0XHR9LFxyXG4gICAgICBleHRlbnNpb25zOiBbXCIuanNcIiwgXCIudHNcIiwgXCIudHN4XCIsIFwiLmpzeFwiXVxyXG5cdFx0fSxcclxuICAgIHNlcnZlcjoge1xyXG4gICAgICBob3N0OiBcIjAuMC4wLjBcIixcclxuXHRcdFx0cG9ydDogdml0ZUVudi5WSVRFX1BPUlQsXHJcblx0XHRcdG9wZW46IHZpdGVFbnYuVklURV9PUEVOLFxyXG4gICAgfSxcclxuICAgIGNzczp7XHJcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICBzY3NzOiB7XHJcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgXCJAL3N0eWxlcy92YXIuc2Nzc1wiO2BcclxuICAgICAgICB9LFxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgcGx1Z2luczogW1xyXG4gICAgICB2dWUoKSxcclxuICAgICAgY3JlYXRlSHRtbFBsdWdpbih7XHJcblx0XHRcdFx0aW5qZWN0OiB7XHJcblx0XHRcdFx0XHRkYXRhOiB7XHJcblx0XHRcdFx0XHRcdHRpdGxlOiB2aXRlRW52LlZJVEVfR0xPQl9BUFBfVElUTEVcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH0pLFxyXG4gICAgICAvLyAqIFx1NEY3Rlx1NzUyOCBzdmcgXHU1NkZFXHU2ODA3XHJcblx0XHRcdGNyZWF0ZVN2Z0ljb25zUGx1Z2luKHtcclxuXHRcdFx0XHRpY29uRGlyczogW3Jlc29sdmUocHJvY2Vzcy5jd2QoKSwgXCJzcmMvYXNzZXRzL3N2Z1wiKV0sXHJcblx0XHRcdFx0c3ltYm9sSWQ6IFwiaWNvbi1bZGlyXS1bbmFtZV1cIlxyXG5cdFx0XHR9KSxcclxuICAgICAgLy8gKiBuYW1lIFx1NTNFRlx1NEVFNVx1NTE5OVx1NTcyOCBzY3JpcHQgXHU2ODA3XHU3QjdFXHU0RTBBXHJcblx0XHRcdFZ1ZVNldHVwRXh0ZW5kKCksXHJcbiAgICAgIC8vICogdml0ZSBcdTUzRUZcdTRFRTVcdTRGN0ZcdTc1MjgganN4L3RzeCBcdThCRURcdTZDRDVcclxuXHRcdFx0dnVlSnN4KCksXHJcbiAgICAgIC8vIC0tLS1lbGVtZW50IHBsdXNcdTgxRUFcdTUyQThcdTYzMDlcdTk3MDBcdTVCRkNcdTUxNjUtLS0tXHJcbiAgICAgIC8vIEF1dG9JbXBvcnQoe1xyXG4gICAgICAvLyAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoKV0sXHJcbiAgICAgIC8vICAgLy8gXHU5MTREXHU3RjZFXHU2NTg3XHU0RUY2XHU3NTFGXHU2MjEwXHU0RjREXHU3RjZFXHJcbiAgICAgIC8vICAgZHRzOiAnc3JjL3R5cGluZ3MvYXV0by1pbXBvcnRzLmQudHMnXHJcbiAgICAgIC8vIH0pLFxyXG4gICAgICAvLyBDb21wb25lbnRzKHtcclxuICAgICAgLy8gICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKCldLFxyXG4gICAgICAvLyAgIC8vIFx1OTE0RFx1N0Y2RVx1NjU4N1x1NEVGNlx1NzUxRlx1NjIxMFx1NEY0RFx1N0Y2RVxyXG4gICAgICAvLyAgIGR0czogJ3NyYy90eXBpbmdzL2NvbXBvbmVudHMuZC50cydcclxuICAgICAgLy8gfSksXHJcbiAgICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuICAgIF0sXHJcbiAgICAvLyAqIFx1NjI1M1x1NTMwNVx1NTNCQlx1OTY2NCBjb25zb2xlLmxvZyAmJiBkZWJ1Z2dlclxyXG4gICAgZXNidWlsZDoge1xyXG5cdFx0XHRwdXJlOiB2aXRlRW52LlZJVEVfRFJPUF9DT05TT0xFID8gW1wiY29uc29sZS5sb2dcIiwgXCJkZWJ1Z2dlclwiXSA6IFtdXHJcblx0XHR9LFxyXG4gIH1cclxufSlcclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxUYXNrXFxcXG9uLWxpbmUtcGFnZVxcXFxzcmNcXFxcdXRpbHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXFRhc2tcXFxcb24tbGluZS1wYWdlXFxcXHNyY1xcXFx1dGlsc1xcXFxnZXRFbnYudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1Rhc2svb24tbGluZS1wYWdlL3NyYy91dGlscy9nZXRFbnYudHNcIjsvLyBSZWFkIGFsbCBlbnZpcm9ubWVudCB2YXJpYWJsZSBjb25maWd1cmF0aW9uIGZpbGVzIHRvIHByb2Nlc3MuZW52XHJcbmV4cG9ydCBmdW5jdGlvbiB3cmFwcGVyRW52KGVudkNvbmY6IFJlY29yZGFibGUpOiBWaXRlRW52IHtcclxuXHRjb25zdCByZXQ6IGFueSA9IHt9O1xyXG5cclxuXHRmb3IgKGNvbnN0IGVudk5hbWUgb2YgT2JqZWN0LmtleXMoZW52Q29uZikpIHtcclxuXHRcdGxldCByZWFsTmFtZSA9IGVudkNvbmZbZW52TmFtZV0ucmVwbGFjZSgvXFxcXG4vZywgXCJcXG5cIik7XHJcblx0XHRyZWFsTmFtZSA9IHJlYWxOYW1lID09PSBcInRydWVcIiA/IHRydWUgOiByZWFsTmFtZSA9PT0gXCJmYWxzZVwiID8gZmFsc2UgOiByZWFsTmFtZTtcclxuXHJcblx0XHRpZiAoZW52TmFtZSA9PT0gXCJWSVRFX1BPUlRcIikge1xyXG5cdFx0XHRyZWFsTmFtZSA9IE51bWJlcihyZWFsTmFtZSk7XHJcblx0XHR9XHJcblx0XHRpZiAoZW52TmFtZSA9PT0gXCJWSVRFX1BST1hZXCIpIHtcclxuXHRcdFx0dHJ5IHtcclxuXHRcdFx0XHRyZWFsTmFtZSA9IEpTT04ucGFyc2UocmVhbE5hbWUpO1xyXG5cdFx0XHR9IGNhdGNoIChlcnJvcikge31cclxuXHRcdH1cclxuXHRcdHJldFtlbnZOYW1lXSA9IHJlYWxOYW1lO1xyXG5cdFx0cHJvY2Vzcy5lbnZbZW52TmFtZV0gPSByZWFsTmFtZTtcclxuXHR9XHJcblx0cmV0dXJuIHJldDtcclxufSJdLAogICJtYXBwaW5ncyI6ICI7QUFBb1AsU0FBUyxjQUFjLGVBQXNDO0FBQ2pULFNBQVMsZUFBZTtBQUN4QixPQUFPLFNBQVM7OztBQ0RULFNBQVMsV0FBVyxTQUE4QjtBQUN4RCxRQUFNLE1BQVcsQ0FBQztBQUVsQixhQUFXLFdBQVcsT0FBTyxLQUFLLE9BQU8sR0FBRztBQUMzQyxRQUFJLFdBQVcsUUFBUSxTQUFTLFFBQVEsUUFBUSxJQUFJO0FBQ3BELGVBQVcsYUFBYSxTQUFTLE9BQU8sYUFBYSxVQUFVLFFBQVE7QUFFdkUsUUFBSSxZQUFZLGFBQWE7QUFDNUIsaUJBQVcsT0FBTyxRQUFRO0FBQUEsSUFDM0I7QUFDQSxRQUFJLFlBQVksY0FBYztBQUM3QixVQUFJO0FBQ0gsbUJBQVcsS0FBSyxNQUFNLFFBQVE7QUFBQSxNQUMvQixTQUFTLE9BQVA7QUFBQSxNQUFlO0FBQUEsSUFDbEI7QUFDQSxRQUFJLFdBQVc7QUFDZixZQUFRLElBQUksV0FBVztBQUFBLEVBQ3hCO0FBQ0EsU0FBTztBQUNSOzs7QURoQkEsU0FBUyx3QkFBd0I7QUFDakMsU0FBUyw0QkFBNEI7QUFDckMsT0FBTyxZQUFZO0FBQ25CLE9BQU8sb0JBQW9CO0FBUDNCLElBQU0sbUNBQW1DO0FBYXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUE0QjtBQUM5RCxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQ3ZDLFFBQU0sVUFBVSxXQUFXLEdBQUc7QUFFOUIsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ1YsT0FBTztBQUFBLFFBQ04sS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxNQUNoQztBQUFBLE1BQ0csWUFBWSxDQUFDLE9BQU8sT0FBTyxRQUFRLE1BQU07QUFBQSxJQUM3QztBQUFBLElBQ0UsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ1QsTUFBTSxRQUFRO0FBQUEsTUFDZCxNQUFNLFFBQVE7QUFBQSxJQUNiO0FBQUEsSUFDQSxLQUFJO0FBQUEsTUFDRixxQkFBcUI7QUFBQSxRQUNuQixNQUFNO0FBQUEsVUFDSixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxJQUFJO0FBQUEsTUFDSixpQkFBaUI7QUFBQSxRQUNuQixRQUFRO0FBQUEsVUFDUCxNQUFNO0FBQUEsWUFDTCxPQUFPLFFBQVE7QUFBQSxVQUNoQjtBQUFBLFFBQ0Q7QUFBQSxNQUNELENBQUM7QUFBQSxNQUVELHFCQUFxQjtBQUFBLFFBQ3BCLFVBQVUsQ0FBQyxRQUFRLFFBQVEsSUFBSSxHQUFHLGdCQUFnQixDQUFDO0FBQUEsUUFDbkQsVUFBVTtBQUFBLE1BQ1gsQ0FBQztBQUFBLE1BRUQsZUFBZTtBQUFBLE1BRWYsT0FBTztBQUFBLElBYU47QUFBQSxJQUVBLFNBQVM7QUFBQSxNQUNWLE1BQU0sUUFBUSxvQkFBb0IsQ0FBQyxlQUFlLFVBQVUsSUFBSSxDQUFDO0FBQUEsSUFDbEU7QUFBQSxFQUNBO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
