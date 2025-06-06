// @ts-ignore
import { CocosPluginManifest, CocosPluginOptions, Panel, PluginType } from "cc-plugin/src/declare";

const pkgName = "cocos-mcp-tools";

const manifest: CocosPluginManifest = {
  name: pkgName,
  version: "1.0.1",
  description: "cocos-mcp-tools",
  author: "cc-plugin",
  main: "./src/main.ts",
  panels: [
    {
      name: "main",
      valid: true,
      type: Panel.Type.DockAble,
      main: "./src/panel/index.ts",
      title: "cocos-mcp-tools",
      width: 700,
      height: 400,
      minWidth: 50,
      minHeight: 400,
    },
  ],
  menus: [
    {
      valid: true,
      path: `i18n.title`,
      accelerator: "CmdOrCtrl+M",
      message: {
        name: "showPanel",
      },
    },
  ],
  scene: "./src/scene.ts",
  i18n_en: "./src/i18n/en.ts",
  i18n_zh: "./src/i18n/zh.ts",
  messages: ["getMcpTools", "runMcpTool"],
};
// 这里的options变量名暂时不支持修改，发布时会进行必要的修改
const options: CocosPluginOptions = {
  obscure: true,
  server: {
    enabled: true,
    port: 2022,
  },
  watchBuild: true,
  outputProject: {
    web: "./web",
  },
};
export default { manifest, options };
