<template>
  <div class="box" :style="styleCustom" ref="box"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

const { node } = defineProps({ node: null });

const box = ref<any>(null);

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
.box {
  background: #356aa2;
}
</style>
