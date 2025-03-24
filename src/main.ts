import pluginConfig from "../cc-plugin.config";
import CCP from "cc-plugin/src/ccp/entry-main";
import { BuilderOptions } from "cc-plugin/src/declare";
import { mcpTools } from "./tools";

CCP.init(pluginConfig, {
  load: () => {
    console.log("plugin load");
  },
  builder: {
    onAfterBuild(target: BuilderOptions) {},
  },
  messages: {
    showPanel() {
      CCP.Adaptation.Panel.open("self.main");
    },
    getMcpTools() {
      const data = JSON.parse(JSON.stringify(mcpTools));
      CCP.Adaptation.Panel.send("self.main", "onRecvMcpTools", data);
    },
    runMcpTool(args: any) {
      (async () => {
        const { name, data } = args;
        const tool = mcpTools.find((t) => t.name === name);
        if (tool && tool.callback) {
          const ret = await tool.callback(data);
          CCP.Adaptation.Panel.send("self.main", "onMcpToolResult", ret);
        }
      })();
    },
  },
  mcp: mcpTools,
});
