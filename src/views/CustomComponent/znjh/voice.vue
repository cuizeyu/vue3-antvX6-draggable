<template>
  <button :style="styleCustom" @click="test">语音</button>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import speech from '@/utils/speech';

const { node } = defineProps({ node: null });

const { handleStop, playVoice } = speech();

const width = ref(node?.data?.width);
const height = ref(node?.data?.height);

const styleCustom = computed(() => {
  return {
    width: `${width.value}px`,
    height: `${height.value}px`
  };
});

const test = () => {
  playVoice('我是一条测试语音');
};

onMounted(() => {
  node.on('change:data', ({ cell, current }: any) => {
    cell.size({ width: current.width, height: current.height });
    height.value = current.height;
    width.value = current.width;
  });
});
</script>

<style scoped lang="scss">
button {
  background: #1376cc;
  border-radius: 6px;
  border: 1px solid #118ad1;
  color: #ffffff;
  cursor: pointer;
}
</style>
