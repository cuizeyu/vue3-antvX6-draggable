<template>
  <input v-model="value" :style="styleCustom" placeholder="请输入" type="textarea" />
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

const value = ref('');
const { node } = defineProps({ node: null });

const width = ref(node?.data?.width);
const height = ref(node?.data?.height);

const styleCustom = computed(() => {
  return {
    width: `${width.value}px`,
    height: `${height.value}px`
  };
});

onMounted(() => {
  node.on('change:data', ({ cell, current }: any) => {
    cell.size({ width: current.width, height: current.height });
    height.value = current.height;
    width.value = current.width;
  });
});
</script>

<style scoped lang="scss">
input {
  flex: 1;
  padding-left: 8px;
  border: none;
  border-radius: 2px 0px 0px 2px;
  &:focus {
    outline: none;
    border: 1px solid #409eff;
  }
}
</style>
