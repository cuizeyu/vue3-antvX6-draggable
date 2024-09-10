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
      axisLine: {
        lineStyle: {
          width: 30,
          color: [
            [0.3, '#67e0e3'],
            [0.7, '#37a2da'],
            [1, '#fd666d']
          ]
        }
      },
      pointer: {
        itemStyle: {
          color: 'auto'
        }
      },
      axisTick: {
        distance: -30,
        length: 8,
        lineStyle: {
          color: '#fff',
          width: 2
        }
      },
      splitLine: {
        distance: -30,
        length: 30,
        lineStyle: {
          color: '#fff',
          width: 4
        }
      },
      axisLabel: {
        color: 'inherit',
        distance: 40,
        fontSize: 20
      },
      detail: {
        valueAnimation: true,
        formatter: '{value} km/h',
        color: 'inherit'
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
