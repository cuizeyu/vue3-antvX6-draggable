import { register } from "@antv/x6-vue-shape";
import { bbCustom, jcCustom, ybpCustom, znjhCustom } from "./custom";

const { jcButton, jcInput, jcContainer } = jcCustom;
const { ybp1, ybp2, ybp3, ybp4 } = ybpCustom;
const { zzt1, zzt2, zzt3, zzt4 } = bbCustom;
const { voice } = znjhCustom;

// 注册基础组件
const jcRegister = () => {
  register({
    shape: "jcButton",
    width: 64,
    height: 32,
    data: {
      width: 64,
      height: 32,
    },
    component: jcButton,
  });

  register({
    shape: "jcInput",
    width: 200,
    height: 32,
    data: {
      width: 200,
      height: 32,
    },
    component: jcInput,
  });
  register({
    shape: "jcContainer",
    width: 200,
    height: 500,
    zIndex: -1,
    data: {
      width: 200,
      height: 500,
      parent: true,
    },
    component: jcContainer,
  });
};

// 注册仪表盘组件
const ybpRegister = () => {
  register({
    shape: "ybp1",
    width: 400,
    height: 400,
    data: {
      width: 400,
      height: 400,
    },
    component: ybp1,
  });
  register({
    shape: "ybp2",
    width: 400,
    height: 400,
    data: {
      width: 400,
      height: 400,
    },
    component: ybp2,
  });
  register({
    shape: "ybp3",
    width: 400,
    height: 400,
    data: {
      width: 400,
      height: 400,
    },
    component: ybp3,
  });
  register({
    shape: "ybp4",
    width: 500,
    height: 530,
    data: {
      width: 500,
      height: 530,
    },
    component: ybp4,
  });
};
// 注册报表组件
const bbRegister = () => {
  register({
    shape: "zzt1",
    width: 500,
    height: 300,
    data: {
      width: 500,
      height: 300,
    },
    component: zzt1,
  });
  register({
    shape: "zzt2",
    width: 500,
    height: 300,
    data: {
      width: 500,
      height: 300,
    },
    component: zzt2,
  });
  register({
    shape: "zzt3",
    width: 500,
    height: 300,
    data: {
      width: 500,
      height: 300,
    },
    component: zzt3,
  });
  register({
    shape: "zzt4",
    width: 500,
    height: 300,
    data: {
      width: 500,
      height: 300,
    },
    component: zzt4,
  });
};

// 注册智能交互组件
const znjhRegister = () => {
  register({
    shape: "voice",
    width: 64,
    height: 32,
    data: {
      width: 64,
      height: 32,
    },
    component: voice,
  });
};

const registerInit = () => {
  jcRegister();
  ybpRegister();
  bbRegister();
  znjhRegister();
};

export default registerInit;
