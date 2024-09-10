<template>
  <div class="box">
    <div class="left">
      <el-tooltip
        v-for="(item, index) in imgList"
        :key="index"
        effect="light"
        :content="item.nickname"
        :hide-after="0"
        :show-arrow="false"
        :offset="-10"
        placement="left"
      >
        <p
          :class="{ active: imgActive === item.name }"
          @click="imgClick(item.name)"
        >
          <img :src="item.img" alt="" draggable="false" /></p
      ></el-tooltip>
    </div>
    <div class="right">
      <el-input
        v-model="searchValue"
        placeholder="请输入关键字..."
        @change="searchChange"
      />
      <div class="supplies" ref="supplies">
        <div class="noEgImg" v-show="imgActive !== 'egIcon'">
          <li
            v-for="(item, index) in currentList"
            :key="index"
            :data-type="item.key"
            @mousedown="startDrag"
          >
            <div>
              <img :src="item.img" alt="" draggable="false" />
            </div>
            <span>{{ item.name }}</span>
          </li>
        </div>
        <div class="egImg" v-show="imgActive === 'egIcon'">
          <div>
            <p
              v-for="(item, index) in currentList.filter((_f: any, fIdx: number) => fIdx % 2 === 0)"
              :key="index"
              :data-type="item.key"
              @mousedown="startDrag"
            >
              <img :src="item.img" alt="" draggable="false" />
              <span>{{ item.name }}</span>
            </p>
          </div>
          <div>
            <p
              v-for="(item, index) in currentList.filter((_f: any, fIdx: number) => fIdx % 2 !== 0)"
              :key="index"
              :data-type="item.key"
              @mousedown="startDrag"
            >
              <img :src="item.img" alt="" draggable="false" />
              <span>{{ item.name }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref, watch } from "vue";
import { Dnd } from "@antv/x6-plugin-dnd";

import { jcIcon, ybpIcon, bbIcon, znjhIcon } from "./iconImg";
import { jcList, ybpList, bbList, znjhList } from "./customImg";

// 搜索框
const searchValue = ref("");
const searchChange = (value: string) => {
  if (value) {
    currentList.value = currentList.value.filter((f: any) => f.name === value);
  } else {
    currentListChange(imgActive.value);
  }
};

// 左侧菜单
const imgActive = ref("jcIcon");
const imgList = ref([
  {
    name: "jcIcon",
    nickname: "原子组件",
    img: jcIcon,
  },
  {
    name: "ybpIcon",
    nickname: "仪表盘",
    img: ybpIcon,
  },
  {
    name: "bbIcon",
    nickname: "报表",
    img: bbIcon,
  },
  {
    name: "znjhIcon",
    nickname: "智能交互",
    img: znjhIcon,
  },
]);
const imgClick = (name: string) => {
  imgActive.value = name;
};

// 组件列表
const currentList = ref<any>([]);
const currentListChange = (value: string) => {
  switch (value) {
    case "jcIcon":
      currentList.value = jcList;
      return;
    case "ybpIcon":
      currentList.value = ybpList;
      return;
    case "bbIcon":
      currentList.value = bbList;
      return;
    case "znjhIcon":
      currentList.value = znjhList;
      return;
    default:
      currentList.value = [];
      return;
  }
};
watch(
  () => imgActive.value,
  (value) => {
    currentListChange(value);
  },
  { immediate: true }
);

// 拖拉拽
const graph: any = inject("graph");
const dnd = ref<any>({});
const startDrag = (e: any) => {
  const target = e.currentTarget;
  const type = target.getAttribute("data-type");
  let node = graph.value.createNode({ shape: type });
  dnd.value.start(node, e);
};
const initDnd = () => {
  dnd.value = new Dnd({
    target: graph.value,
    validateNode() {
      return true;
    },
  });
};
watch(graph, () => {
  initDnd();
});
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  display: flex;
  background: rgba(6, 72, 143, 0.8);
  .left {
    background: rgba(2, 92, 169, 0.8);
    width: 60px;
    display: flex;
    flex-direction: column;

    p {
      cursor: pointer;
      margin: 0;
      width: 100%;
      height: 56px;
      display: flex;
      justify-content: center;
      align-items: center;
      &.active {
        background: #0c81e7;
      }
    }
  }
  .right {
    flex: 1;
    padding: 10px;

    :deep(.el-input) {
      width: 208px;
      height: 32px;
      border-radius: 1px;
      border: 1px solid #3a4b62;
      .el-input__wrapper {
        box-shadow: none;
        background-color: transparent;
        border: 1px solid #3a4b62;
        input {
          border: none;
          color: #fff;
        }
      }
    }
    .supplies {
      margin-top: 10px;
      width: 100%;
      height: calc(100% - 10px - 32px);
      overflow: auto;
      .noEgImg {
        display: flex;
        align-content: flex-start;
        flex-wrap: wrap;
        gap: 6px;
        li {
          display: flex;
          align-items: center;
          flex-direction: column;
          div {
            border: 1px solid #8090a7;
            width: 76px;
            height: 76px;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 4px;
          }
          span {
            font-family: Microsoft YaHei;
            font-size: 12px;
            color: #ffffff;
          }
        }
      }
      .egImg {
        display: flex;
        div {
          flex: 1;
          p {
            height: auto;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            margin-bottom: 4px;
            img {
              margin-bottom: 4px;
              border: 1px solid #8090a7;
              padding: 4px;
            }
            span {
              font-family: Microsoft YaHei;
              font-size: 12px;
              color: #ffffff;
            }
          }
        }
      }
    }
  }
}
::-webkit-scrollbar {
  width: 1px;
  height: 1px;
}
::-webkit-scrollbar-thumb {
  background-color: #0c5fa6;
  border-radius: 10px;
}
</style>
