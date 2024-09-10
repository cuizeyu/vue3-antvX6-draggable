import { defineStore } from "pinia";
import { ref } from "vue";

export const useX6Store = defineStore("x6", () => {
  const initJSON = ref<any>(null); // 保存画布
  const currentNode = ref<any>(null); // 当前选中节点

  function currentNodeChange(item: any) {
    currentNode.value = item;
  }
  function initJSONChange(item: any) {
    initJSON.value = item;
  }

  return {
    initJSON,
    currentNode,
    currentNodeChange,
    initJSONChange,
  };
});
