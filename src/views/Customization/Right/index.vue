<template>
  <div class="box">
    <div class="tabs">
      <p
        v-for="(item, index) in tabsList"
        :key="index"
        :class="{ active: tabsActive === item }"
        @click="tabsClick(item)"
      >
        {{ item }}
      </p>
    </div>
    <div class="content">
      <div v-if="appStore.currentNode?.id">
        <div v-show="tabsActive === '属性'">
          <p>
            <span>宽度：</span>
            <el-input-number
              v-model="widthValue"
              :controls="false"
              :min="0"
              @change="widthChange"
            />
          </p>
          <p>
            <span>高度：</span
            ><el-input-number
              v-model="heightValue"
              :controls="false"
              :min="0"
              @change="heightChange"
            />
          </p>
        </div>
      </div>
      <div v-else>
        <img :src="unselected" alt="" />
      </div>
    </div>
    <div class="footer">
      当前选择：{{ appStore.currentNode?.id.substring(0, 8) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import unselected from "@/assets/images/unselected.png";
import { useX6Store } from "@/store";

const appStore = useX6Store();

// tabs
const tabsList = ref(["属性", "信息"]);
const tabsActive = ref("属性");
const tabsClick = (item: string) => {
  tabsActive.value = item;
};

// 属性
const widthValue = ref(0);
const heightValue = ref(0);
watch(
  () => appStore.currentNode?.data,
  (value) => {
    if (value) {
      widthValue.value = value.width;
      heightValue.value = value.height;
    }
  }
);

const widthChange = (value?: number, _prev?: number) => {
  if (value) {
    appStore.currentNode.setData({
      ...appStore.currentNode.data,
      width: value,
    });
  }
};
const heightChange = (value?: number, _prev?: number) => {
  if (value) {
    appStore.currentNode.setData({
      ...appStore.currentNode.data,
      height: value,
    });
  }
};
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  display: flex;
  background: rgba(6, 72, 143, 0.8);
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  font-family: Microsoft YaHei;
  color: #ffffff;
  .tabs {
    padding: 10px 6px 0;
    display: flex;
    justify-content: space-between;
    p {
      cursor: pointer;
      margin: 0;
      width: 137px;
      height: 44px;
      background: #072b52;
      display: flex;
      justify-content: center;
      align-items: center;
      &.active {
        background: #235696;
      }
    }
  }
  .content {
    flex: 1;
    padding: 20px;
    p {
      margin: 0 0 10px 0;
      display: flex;
      align-items: center;
      border-bottom: 2px solid #11539b;
      height: 32px;
      font-size: 14px;
      line-height: 18px;
      span {
        display: block;
        width: auto;
      }
      :deep(.el-input-number) {
        flex: 1;
        * {
          font-family: Microsoft YaHei;
          color: #ffffff;
          box-shadow: none;
          border: none;
          background: transparent;
          text-align: start;
        }
      }
    }
  }
  .footer {
    height: 36px;
    background: #0e2d4f;
    border-width: 1px 0px 0px 0px;
    border-style: solid;
    border-color: #141b25;
    display: flex;
    align-items: center;
    line-height: 1;
    font-size: 14px;
    padding-left: 12px;
  }
}
</style>
