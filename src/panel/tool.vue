<template>
  <div class="tool"></div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import ccui from "@xuyanfeng/cc-ui";
const { CCButton } = ccui.components;
export default defineComponent({
  name: "tool",
  components: { CCButton },
  setup(props, { emit }) {
    return {};
  },
});
</script>
<style lang="less" scoped>
.tool {
  display: flex;
}
</style>
