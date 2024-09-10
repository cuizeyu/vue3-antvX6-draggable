<template>
  <div ref="chartContainer" :style="styleCustom"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { ref, reactive, onMounted, onActivated, markRaw, computed, onUpdated } from 'vue';
const { node }: any = defineProps({ node: { type: undefined } });

const width = ref(node?.data?.width);
const height = ref(node?.data?.height);

const styleCustom = computed(() => {
  return {
    width: `${width.value}px`,
    height: `${height.value}px`,
    background: '#fff'
  };
});

const chartContainer = ref<any>('');
let myChart: any = null;
const option = reactive({
  series: [
    {
      type: 'gauge',
      progress: {
        show: true,
        width: 18
      },
      axisLine: {
        lineStyle: {
          width: 18
        }
      },
      axisTick: {
        show: false
      },
      splitLine: {
        length: 15,
        lineStyle: {
          width: 2,
          color: '#999'
        }
      },
      axisLabel: {
        distance: 25,
        color: '#999',
        fontSize: 20
      },
      anchor: {
        show: true,
        showAbove: true,
        size: 25,
        itemStyle: {
          borderWidth: 10
        }
      },
      title: {
        show: false
      },
      detail: {
        valueAnimation: true,
        fontSize: 80,
        offsetCenter: [0, '70%']
      },
      data: [
        {
          value: 70
        }
      ]
    }
  ]
});

onMounted(() => {
  node.on('change:data', ({ cell, current }: any) => {
    cell.size({ width: current.width, height: current.height });
    height.value = current.height;
    width.value = current.width;
  });

  myChart = markRaw(echarts.init(chartContainer.value));
  myChart.setOption(option);
  window.addEventListener('resize', () => {
    myChart.resize();
  });
});

onUpdated(() => {
  if (myChart) {
    myChart.resize();
  }
});

onActivated(() => {
  if (myChart) {
    myChart.resize();
  }
});
</script>
<style scoped lang="scss"></style>
