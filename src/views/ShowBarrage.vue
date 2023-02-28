<!--
 * @Author: liyy
 * @Date: 2023-02-24 15:28:33
 * @Description: 
-->

<script setup>
import { store } from "../assets/js/common.js";
import { onMounted, ref, reactive, watch } from "vue";
import { get, post } from "../assets/js/axios.js";
import { useRouter } from "vue-router";
import { ImagePreview } from "vant";

const router = useRouter();
const params = ref({});
const value = ref(0);
const onChange = (value) => Toast("当前值：" + value);

function onClickLeft() {
  router.back();
}
function showText() {
  router.push("");
}
onMounted(() => {
  params.value = router.currentRoute.value.query;
  console.log("$router:", router.currentRoute.value.query);
});
</script>
<template>
  <div class="HandBarrage" :style="{ backgroundColor: params.bgColor }">
    <span
      class="text-box"
      :style="{ color: params.textColor, fontSize: params.textSize }"
      >{{ params.text }}</span
    >
  </div>
</template>

<style lang="less" scoped>
.HandBarrage {
  height: 100vh;
   position: relative;
  .text-box {
    display: inline-block;
    transform-origin: left bottom;
    transform: rotateZ(90deg);
    animation: myfirst 5s;
    -webkit-animation: myfirst 5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    position: absolute;
    height: 100vw;
    line-height: 100vw;
    font-weight: 600;
    width: max-content;
  }
}
@keyframes myfirst {
  0% {
    top: -100vw;
    transform: translateY(-100vh) rotateZ(90deg);
  }
  100% {
    top: -100vw;
    transform: translateY(100vh) rotateZ(90deg);
  }
}
</style>

