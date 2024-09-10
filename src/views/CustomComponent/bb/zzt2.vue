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
    text: 'Waterfall Chart',
    subtext: 'Living Expenses in Shenzhen'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
    formatter: function (params) {
      var tar = params[1];
      return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    splitLine: { show: false },
    data: ['Total', 'Rent', 'Utilities', 'Transportation', 'Meals', 'Other']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: 'Placeholder',
      type: 'bar',
      stack: 'Total',
      itemStyle: {
        borderColor: 'transparent',
        color: 'transparent'
      },
      emphasis: {
        itemStyle: {
          borderColor: 'transparent',
          color: 'transparent'
        }
      },
      data: [0, 1700, 1400, 1200, 300, 0]
    },
    {
      name: 'Life Cost',
      type: 'bar',
      stack: 'Total',
      label: {
        show: true,
        position: 'inside'
      },
      data: [2900, 1200, 300, 200, 900, 300]
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
