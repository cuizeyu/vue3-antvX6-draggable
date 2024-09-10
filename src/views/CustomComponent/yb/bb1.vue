<template>
  <div ref="XChart" class="XChart" @click="nodeClick"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, reactive, onMounted, onActivated, markRaw } from 'vue';
const { node }: any = defineProps({ node: { type: undefined } });
const XChart = ref<any>('');
const option = reactive({
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
});

const nodeClick = () => {};

onMounted(() => {
  XChart.value = markRaw(echarts.init(XChart.value));
  XChart.value.setOption(option);

  // window.addEventListener("resize", () => {
  //   XChart.value.resize();
  // });
});

onActivated(() => {
  if (XChart.value) {
    XChart.value.resize();
  }
});
</script>
<style scoped lang="scss">
.XChart {
  width: 100%;
  height: 100%;
}
</style>
