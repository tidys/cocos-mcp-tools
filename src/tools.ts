import CCP from "cc-plugin/src/ccp/entry-main";
import { PluginMcpTool } from "cc-plugin/src/declare";
import { existsSync } from "fs";

export const mcpTools: PluginMcpTool[] = [
  {
    name: "openPrefab",
    description: "打开预制体",
    inputSchema: {
      type: "object",
      properties: {
        uuid: {
          type: "string",
          description: "预制体的uuid",
        },
      },
      required: [],
    },
    callback: async (args: any) => {
      const { uuid } = args;
      CCP.Adaptation.AssetDB.open(uuid);
      return `open prefab success`;
    },
  },
  {
    name: "getOpenPrefabRootNodeUUID",
    description: "打开预制体后，获取打开的预制体的根节点uuid",
    inputSchema: {
      type: "object",
      properties: {},
      required: [],
    },
    callback: async (args: any) => {
      const { uuid } = args;
      const rootUUID = await CCP.Adaptation.Panel.executeSceneScript<string>("getOpenPrefabRootNodeUUID");
      return `根节点UUID为: ${rootUUID || ""}`;
    },
  },
  {
    name: "addSpriteComponent",
    description: "给节点添加Sprite组件",
    inputSchema: {
      type: "object",
      properties: {
        nodeUUID: {
          type: "string",
          description: "节点的uuid",
        },
      },
      required: [],
    },
    callback: async (args: any) => {
      const { nodeUUID } = args;
      const ret = await CCP.Adaptation.Panel.executeSceneScript<string>("addSpriteComponent", nodeUUID);
      return `添加结果：${ret}`;
    },
  },
  {
    name: "openScene",
    description: "打开场景",
    inputSchema: {
      type: "object",
      properties: {
        uuid: {
          type: "string",
          description: "场景资源文件的uuid",
        },
      },
      required: [],
    },
    callback: async (args: any) => {
      const { uuid } = args;
      CCP.Adaptation.AssetDB.open(uuid);
      return `open scene success`;
    },
  },
  {
    name: "createPrefab",
    description: "创建空的预制体",
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
        if (assetUUID) {
          await CCP.Adaptation.Panel.executeSceneScript("cleanTempNodes");
          return `create prefab success, uuid is ${assetUUID}`;
        } else {
          await CCP.Adaptation.Panel.executeSceneScript("cleanTempNodes");
          return `create prefab failed: ${url}`;
        }
      }
    },
  },
];
