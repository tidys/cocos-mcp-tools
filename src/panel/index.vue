<template>
  <div class="panel">
    <div class="content">
      <div class="list">
        <div class="title">Tools</div>
        <div class="tools" v-for="(item, index) in tools" :key="index">
          <div @click="onClickTool(item)">
            {{ item.name }}
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div v-if="tool" class="tool">
        <div class="title">
          {{ tool.name }}
        </div>
        <div class="desc">
          {{ tool.description }}
        </div>
        <div v-if="param.length">
          <div>Param:</div>
          <div v-for="(item, key) in param" :key="key">
            <CCProp :name="item.key" :tooltip="item.desc">
              <CCInput v-if="item.type === 'string'" v-model:value="item.value" />
              <CCInputNumber v-if="item.type === 'number'" v-model:value="item.value"></CCInputNumber>
              <CCCheckBox v-if="item.type === 'boolean'" v-model:value="item.value"></CCCheckBox>
            </CCProp>
          </div>
        </div>

        <div class="op">
          <CCButton>
            <div class="btn" @click="onRunTool">
              <i class="iconfont icon_fly"></i>
              <div style="font-size: 16px; margin: 0 4px">Run Tool</div>
            </div>
          </CCButton>
        </div>

        <div class="title">Tool Result:</div>
      </div>
    </div>
    <CCFootBar></CCFootBar>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, provide, nextTick } from "vue";
import PluginConfig from "../../cc-plugin.config";
import ccui from "@xuyanfeng/cc-ui";
import CCP from "cc-plugin/src/ccp/entry-render";
import { emitter, Msg } from "./emitter";
import { PluginMcpTool } from "cc-plugin/src/declare";
import Tool from "./tool.vue";
const { CCInput, CCButton, CCProp, CCInputNumber, CCCheckBox, CCFootBar } = ccui.components;
export default defineComponent({
  name: "index",
  components: { CCButton, Tool, CCProp, CCInput, CCInputNumber, CCCheckBox, CCFootBar },
  setup(props, { emit }) {
    onMounted(() => {});
    const msg = ref(PluginConfig.manifest.name);
    const tools = ref<PluginMcpTool[]>([]);
    const tool = ref<PluginMcpTool | null>(null);
    const param = ref<Array<{ key: string; type: string; desc: string; value: any }>>([]);
    CCP.Adaptation.Panel.sendToMain("self", "getMcpTools", "", () => {});
    emitter.on(Msg.RecvMcpTools, (data: PluginMcpTool[]) => {
      if (data && Array.isArray(data) && data.length) {
        tools.value = data;
        onClickTool(data[0]);
      }
    });

    function onClickTool(data: PluginMcpTool) {
      tool.value = data;
      const p = [];
      for (let key in data.inputSchema.properties) {
        p.push({
          key,
          value: "",
          type: data.inputSchema.properties[key].type,
          desc: data.inputSchema.properties[key].description,
        });
      }
      param.value = p;
    }
    return {
      msg,
      param,
      tools,
      tool,
      onClickTool,
      onRunTool() {
        try {
          const data = {};
          param.value.forEach((item) => {
            if (!item.value) {
              throw new Error(`param ${item.key} is invalid`);
            }
            data[item.key] = item.value;
          });
          console.log(JSON.stringify(data));
        } catch (e) {
          ccui.footbar.showError(e);
        }
      },
    };
  },
});
</script>

<style scoped lang="less">
.panel {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: #303030;
  .content {
    display: flex;
    flex-direction: row;
    flex: 1;
    overflow: hidden;
    background-color: #303030;

    .list {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      margin: 0 5px;

      .title {
        font-size: 15px;
      }
      .tools {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        &:hover {
          background-color: #4e4e4e;
        }
      }
    }
    .divider {
      width: 1px;
      height: 100%;
      background-color: #4e4e4e;
    }
    .tool {
      flex: 1;
      margin: 0 5px;
      display: flex;
      flex-direction: column;
      .title {
        font-size: 15px;
        font-weight: bold;
      }
      .desc {
        font-size: 12px;
        color: gray;
      }
      .op {
        display: flex;
        flex-direction: row;
        .btn {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
      }
    }
  }
}
</style>
