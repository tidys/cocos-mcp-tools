import { createApp } from "vue";
import App from "./index.vue";
import CCP from "cc-plugin/src/ccp/entry-render";
import pluginConfig from "../../cc-plugin.config";
import ccui from "@xuyanfeng/cc-ui";
import "@xuyanfeng/cc-ui/dist/ccui.css";
import "@xuyanfeng/cc-ui/iconfont/iconfont.css";
import { emitter, Msg } from "./emitter";
import { PluginMcpTool } from "cc-plugin/src/declare";

export default CCP.init(pluginConfig, {
  ready: function (rootElement: any, args: any) {
    const app = createApp(App);
    app.use(ccui);
    app.mount(rootElement);
  },
  messages: {
    onRecvMcpTools: (event: any, data: PluginMcpTool[]) => {
      emitter.emit(Msg.RecvMcpTools, data);
    },
    onMcpToolResult: (event: any, data: any) => {
      emitter.emit(Msg.McpToolResult, data);
    },
  },
});
