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
  title: {
    text: 'Bar Chart with Negative Value'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    top: 80,
    bottom: 30
  },
  xAxis: {
    type: 'value',
    position: 'top',
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
  },
  yAxis: {
    type: 'category',
    axisLine: { show: false },
    axisLabel: { show: false },
    axisTick: { show: false },
    splitLine: { show: false },
    data: ['ten', 'nine', 'eight', 'seven', 'six', 'five', 'four', 'three', 'two', 'one']
  },
  series: [
    {
      name: 'Cost',
      type: 'bar',
      stack: 'Total',
      label: {
        show: true,
        formatter: '{b}'
      },
      data: [
        {
          value: -0.07,
          label: {
            position: 'right'
          }
        },
        {
          value: -0.09,
          label: {
            position: 'right'
          }
        },
        0.2,
        0.44,
        {
          value: -0.23,
          label: {
            position: 'right'
          }
        },
        0.08,
        {
          value: -0.17,
          label: {
            position: 'right'
          }
        },
        0.47,
        {
          value: -0.36,
          label: {
            position: 'right'
          }
        },
        0.18
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
