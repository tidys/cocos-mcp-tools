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
  },
  mcp: mcpTools,
});
