import button from "@/assets/images/jcImg/button.png";
import container from "@/assets/images/jcImg/container.png";
import input from "@/assets/images/jcImg/input.png";

import {
  default as ybp1,
  default as ybp2,
  default as ybp3,
  default as ybp4,
} from "@/assets/images/ybpImg/ybp1.png";

import {
  default as zzt1,
  default as zzt2,
  default as zzt3,
  default as zzt4,
} from "@/assets/images/bbImg/zzt1.png";

import voice from "@/assets/images/znjhImg/voice.png";

const jcList = [
  {
    key: "jcInput",
    name: "输入框",
    img: input,
  },
  {
    key: "jcButton",
    name: "按钮",
    img: button,
  },
  {
    key: "jcContainer",
    name: "容器",
    img: container,
  },
  // {
  //   key: "jcTree",
  //   name: "树",
  //   img: tree,
  // },
];
const ybpList = [
  {
    key: "ybp1",
    name: "仪表盘1",
    img: ybp1,
  },
  {
    key: "ybp2",
    name: "仪表盘2",
    img: ybp2,
  },
  {
    key: "ybp3",
    name: "仪表盘3",
    img: ybp3,
  },
  {
    key: "ybp4",
    name: "仪表盘4",
    img: ybp4,
  },
];
const bbList = [
  {
    key: "zzt1",
    name: "柱状图1",
    img: zzt1,
  },
  {
    key: "zzt2",
    name: "柱状图2",
    img: zzt2,
  },
  {
    key: "zzt3",
    name: "柱状图3",
    img: zzt3,
  },
  {
    key: "zzt4",
    name: "柱状图4",
    img: zzt4,
  },
];
const znjhList = [
  {
    key: "voice",
    name: "语音",
    img: voice,
  },
];

export { bbList, jcList, ybpList, znjhList };
