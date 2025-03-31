import CCP from "cc-plugin/src/ccp/entry-main";
import { PluginMcpTool } from "cc-plugin/src/declare";
import { existsSync } from "fs";

export const mcpTools: PluginMcpTool[] = [
  {
    name: "sum",
    valid: true, // 参考模版接口，默认不生效
    description: "the sum of two numbers",
    inputSchema: {
      type: "object",
      properties: {
        number1: {
          type: "string",
          description: "number1",
        },
        number2: {
          type: "string",
          description: "number1",
        },
      },
      required: ["state"],
    },
    callback: async (args: any) => {
      const { number1, number2 } = args;
      return `${number1}+${number2}=${Number(number1) + Number(number2)}!`;
    },
  },
  {
    name: "createPrefab",
    description: "创建预制体",
    inputSchema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "预制体名称",
        },
      },
      required: ["name"],
    },
    callback: async (args: any) => {
      const { name } = args;
      const url = `db://assets/${name}.prefab`;
      const fs = CCP.Adaptation.Util.urlToFspath(url);
      if (fs && existsSync(fs)) {
        return `prefab ${name} already exists`;
      } else {
        const nodeUUID = await CCP.Adaptation.Panel.executeSceneScript<string>("createEngineNode", name);
        const assetUUID = await CCP.Adaptation.AssetDB.createPrefab(url, nodeUUID);
        return `create prefab success, uuid is ${assetUUID}`;
      }
    },
  },
];
