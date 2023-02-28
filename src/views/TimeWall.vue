<!--
 * @Author: liyy
 * @Date: 2023-02-23 17:33:07
 * @Description: 时间屏幕
-->
<script setup>
import { store } from "../assets/js/common.js";
import { onMounted, ref, reactive, watch } from "vue";
import { get, post } from "../assets/js/axios.js";
import { useRouter } from "vue-router";
import { ImagePreview } from "vant";
const router = useRouter();
const joke = ref({ title: "标题", joke: "你就是个笑话！" });
const second = ref("");
const minute = ref("");
const hour = ref("");
const hourClass = ref("");
const minuteClass = ref([]);
const iconShow = ref(false);
const portrait = ref(false);

async function onLoad() {
  let params = { key: "192299f12ff4f65053783ab28f3c5030" };
  await get(`https://apis.tianapi.com/tenwhy/index`, params).then((res) => {
    if (res.code == 200) {
      joke.value.title = res.result.list[0].title;
      joke.value.joke = res.result.list[0].content;
    } else {
    }
  });
}
function initLoad() {
  prev.value = !prev.value;
  next.value = !next.value;
  onLoad();
}
function updateTime() {
  let date = new Date();
  second.value = zeroFilling(date.getSeconds());
  minute.value = zeroFilling(date.getMinutes());
  hour.value = zeroFilling(date.getHours());
}
function zeroFilling(num) {
  return num >= 10 ? num : "0" + num;
}

watch(minute, (newminute) => {
  minuteClass.value = "top-second";
  setTimeout(() => {
    minuteClass.value = "";
  }, 1000);
});
watch(hour, (newhour) => {
  hourClass.value = "top-second";
  setTimeout(() => {
    hourClass.value = "";
  }, 1000);
});
onMounted(() => {
  setInterval(() => {
    updateTime();
  }, 900);
});
</script>
<template>
  <div class="TenWhy bg-img-blur" @click="iconShow = !iconShow">
    <div class="changScreen" v-show="iconShow" @click.stop="portrait = !portrait">
      <img src="@/assets/images/changScreen.png" alt="" />
    </div>
    <div class="portrait-screen" v-if="portrait">
      <div class="time-item">
        <div :class="['top-box', minuteClass]"></div>
        <div :class="['top-box2', minuteClass + '2']"></div>
        <div class="line-box"></div>
        <div class="bottom-box"></div>
        <div class="mask-box">{{ hour }}</div>
      </div>
      <div class="time-item">
        <div :class="['top-box', minuteClass]"></div>
        <div :class="['top-box2', minuteClass + '2']"></div>
        <div class="line-box"></div>
        <div class="bottom-box"></div>
        <div class="mask-box">{{ minute }}</div>
      </div>
      <div class="time-item">
        <div class="top-box top-second"></div>
        <div class="top-box2 top-second2"></div>
        <div class="line-box"></div>
        <div class="bottom-box"></div>
        <div class="mask-box">{{ second }}</div>
      </div>
    </div>
    <div class="Landscape-screen" v-else>
      <div class="time-item">
        <div :class="['top-box', minuteClass]"></div>
        <div :class="['top-box2', minuteClass + '2']"></div>
        <div class="line-box"></div>
        <div class="bottom-box"></div>
        <div class="mask-box">{{ hour }}</div>
      </div>
      <div class="time-item">
        <div :class="['top-box', minuteClass]"></div>
        <div :class="['top-box2', minuteClass + '2']"></div>
        <div class="line-box"></div>
        <div class="bottom-box"></div>
        <div class="mask-box">{{ minute }}</div>
      </div>
      <div class="time-item">
        <div class="top-box top-second"></div>
        <div class="top-box2 top-second2"></div>
        <div class="line-box"></div>
        <div class="bottom-box"></div>
        <div class="mask-box">{{ second }}</div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
.TenWhy {
  height: 100vh;
  overflow-x: hidden;
  background-color: #000;
  position: relative;
  .changScreen {
    width: 30px;
    height: 30px;
    position: absolute;
    top: 10px;
    right: 30px;
    z-index: 999;
    img{
      width: 100%;
    }
  }
  .portrait-screen {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    justify-content: space-evenly;
    .time-item {
      position: relative;
      .top-box {
        width: 60vw;
        height: 14vh;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        background-color: #323232;
        z-index: 99;
      }
      .top-box2 {
        width: 60vw;
        height: 14vh;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        background-color: #323232;
        z-index: 99;
        transform: rotateX(-90deg);
        transform-origin: center bottom;
        position: absolute;
        top: 0;
        left: 0;
      }
      .bottom-box {
        width: 60vw;
        height: 14vh;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        background-color: #323232;
        z-index: 9;
      }
      .mask-box {
        font-size: 140px;
        font-weight: 400;
        color: #fff;
        position: absolute;
        top: 0px;
        left: calc(50% - 20vw);
        z-index: 999;
        height: calc(28vh + 3px);
        line-height: calc(28vh + 3px);
        width: 40vw;
        text-align: center;
      }
      .line-box {
        height: 3px;
        background-color: #000;
        // width: 100vw;
        z-index: 1000;
      }
    }
  }
  .top-second {
    animation: myfirst1 1s;
    -webkit-animation: myfirst1 1s;
    animation-iteration-count: infinite;
    animation-timing-function: ease;
  }
  .top-second2 {
    animation: myfirst2 1s;
    -webkit-animation: myfirst2 1s;
    animation-iteration-count: infinite;
    animation-timing-function: ease;
  }

  @keyframes myfirst1 {
    0% {
      transform: rotateX(90deg);
      transform-origin: center 102%;
      background-color: #323232;
    }
    100% {
      transform: rotateX(180deg);
      transform-origin: center 102%;
      background-color: #434344;
    }
    // 100% {transform: rotateX(-180deg);transform-origin:center bottom;}
  }

  @keyframes myfirst2 {
    from {
      transform: rotateX(0deg);
      transform-origin: center bottom;
      background-color: #434344;
    }
    to {
      transform: rotateX(0deg);
      transform-origin: center bottom;
      background-color: #323232;
    }
  }

  .Landscape-screen {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 100vh;
    justify-content: space-evenly;
    .time-item {
      position: relative;
      transform: rotateZ(90deg);
      .top-box {
        width: 50vw;
        height: 14vh;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        background-color: #323232;
        z-index: 99;
      }
      .top-box2 {
        width: 50vw;
        height: 14vh;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        background-color: #323232;
        z-index: 99;
        transform: rotateX(-90deg);
        transform-origin: center bottom;
        position: absolute;
        top: 0;
        left: 0;
      }
      .bottom-box {
        width: 50vw;
        height: 14vh;
        border-bottom-left-radius: 20px;
        border-bottom-right-radius: 20px;
        background-color: #323232;
        z-index: 9;
      }
      .mask-box {
        font-size: 140px;
        font-weight: 400;
        color: #fff;
        position: absolute;
        top: 0px;
        left: calc(50% - 20vw);
        z-index: 999;
        height: calc(28vh + 3px);
        line-height: calc(28vh + 3px);
        width: 40vw;
        text-align: center;
      }
      .line-box {
        height: 3px;
        background-color: #000;
        // width: 100vw;
        z-index: 1000;
      }
    }
  }
}
</style>

