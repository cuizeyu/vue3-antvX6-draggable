<template>
  <article ref="appRef">
    <div class="options">
      <el-button @click="clearX6">清空画布</el-button>
      <el-button @click="deleteClick">删除组件</el-button>
      <el-button @click="toJSON">保存</el-button>
    </div>
    <div class="left">
      <Left></Left>
    </div>
    <div class="center">
      <div id="container"></div>
    </div>
    <div class="right" :class="{ show: isRight }">
      <Right v-show="isRight"></Right>
    </div>
  </article>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, provide, ref, watch } from "vue";
import { ElMessage } from "element-plus";
import { Graph } from "@antv/x6";
import Left from "./Left/index.vue";
import Right from "./Right/index.vue";
import registerInit from "./register";
import { useX6Store } from "@/store";
import useDraw from "@/utils/useDraw";

const { appRef, calcRate, windowDraw, unWindowDraw } = useDraw();
const x6Store = useX6Store();

const isRight = ref(false);

// x6画布
const graph = ref<any>({});
const init = () => {
  graph.value = new Graph({
    container: document.getElementById("container")!,
    autoResize: true,
    panning: true,
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: "ctrl",
      minScale: 0.5,
      maxScale: 3,
    },
    embedding: {
      enabled: true,
      findParent({ node }) {
        const bbox = node.getBBox();
        return this.getNodes().filter((node) => {
          const data = node.getData<any>();
          if (data && data.parent) {
            const targetBBox = node.getBBox();
            return bbox.isIntersectWithRect(targetBBox);
          }
          return false;
        });
      },
    },
    highlighting: {
      embedding: {
        name: "stroke",
        args: {
          padding: -1,
          attrs: {
            stroke: "#73d13d",
          },
        },
      },
    },
  });

  // 回显已保存画布
  x6Store.initJSON && graph.value.fromJSON(x6Store.initJSON);

  // 注册自定义组件
  registerInit();

  // 点击当前节点执行
  graph.value.on("node:click", ({ cell }: any) => {
    x6Store.currentNodeChange(cell);
    cell.addTools({
      name: "button-remove",
      args: {
        x: "100%",
        y: -10,
        offset: { x: 0, y: 0 },
      },
    });
    isRight.value = true;
  });

  // 节点删除执行
  graph.value.on("node:removed", () => {
    isRight.value = false;
    x6Store.currentNodeChange(null);
  });

  // 节点添加执行
  graph.value.on("node:added", ({ node }: any) => {});

  // 点击画布执行
  // graph.value.on("blank:click", () => {
  //   x6Store.currentNode && x6Store.currentNode.removeTool("button-remove");
  //   x6Store.currentNodeChange(null);
  // });

  // // 鼠标 Hover 时执行
  // graph.value.on("node:mouseenter", ({ node }: any) => {
  //   console.log(node, "Hover");
  // });

  // // 鼠标移开时执行
  // graph.value.on("node:mouseleave", ({ node }: any) => {
  //   console.log(node, "鼠标移开");
  // });
};

// 清空画布
const clearX6 = () => {
  x6Store.currentNodeChange(null);
  graph.value.clearCells();
};
// 删除当前选中组件
const deleteClick = () => {
  if (x6Store.currentNode) {
    x6Store.currentNode.remove();
    x6Store.currentNodeChange(null);
  } else {
    ElMessage({
      grouping: true,
      message: "当前未选中组件",
      type: "warning",
    });
  }
};
// 保存
const toJSON = () => {
  console.log(graph.value.toJSON(), "graph.value.toJSON()");
  x6Store.initJSONChange(graph.value.toJSON());
  ElMessage({
    grouping: true,
    message: "保存成功",
    type: "success",
  });
};

// 切换选中组件清空原组件删除按钮
watch(
  () => x6Store.currentNode,
  (_newVal, oldVal) => {
    if (!oldVal) return;
    oldVal.removeTool("button-remove");
  }
);

onMounted(() => {
  init();
  windowDraw();
  calcRate();
});
onUnmounted(() => {
  graph.value.dispose();
  unWindowDraw();
});
provide("graph", graph);
</script>

<style scoped lang="scss">
article {
  overflow: hidden;
  user-select: none;
  width: 1920px;
  height: 1080px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform-origin: left top;
  .options {
    position: absolute;
    z-index: 2;
    top: 10px;
    right: 10px;
    height: 32px;
    display: flex;
    :deep(.el-button) {
      font-size: 18px;
      border-radius: 2px;
      border: 1px solid #0e8bf9;
      background: rgba(14, 139, 249, 0.3);
      color: #ffffff;
      &:nth-last-child(1) {
        margin-left: 10px;
        background: #0e8bf9;
      }
    }
  }
  .left {
    position: absolute;
    top: 10%;
    left: 50px;
    height: 80%;
    width: 330px;
    z-index: 2;
  }
  .center {
    height: 100%;
    flex: 1;
    position: fixed;
    top: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    #container {
      background: rgb(156, 255, 7);
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .right {
    position: absolute;
    z-index: 2;
    top: 10%;
    right: 50px;
    height: 80%;
    width: 0;
    overflow: hidden;
    transition: 0.6s all;
    &.show {
      width: 292px;
    }
  }
}
</style>
