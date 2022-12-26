<script setup>
import { store } from "../assets/js/common.js";
import { onMounted, ref, reactive, watch } from "vue";
import { get, post } from "../assets/js/axios.js";
import { useRouter } from "vue-router";
import { ImagePreview } from "vant";
const router = useRouter();
const joke = ref({ title: "标题", joke: "你就是个笑话！" });
const jokeShow = ref(true);
const prev = ref(true);
const next = ref(false);

async function onLoad() {
  let params = { key: "192299f12ff4f65053783ab28f3c5030" };
  await get(`https://apis.tianapi.com/tenwhy/index`, params).then((res) => {
    if (res.code==200) {
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

onMounted(() => {onLoad();});
</script>
<template>
  <div class="TenWhy bg-img-blur">
    <div class="head-title">每日一问</div>
    <div
      class="joke-card animate__animated prev"
      :class="prev ? 'animate__backInRight' : 'animate__backOutLeft'"
      v-show="prev"
      @click="initLoad"
    >
      <div class="title">{{ joke.title }}</div>
      <div class="joke">{{ joke.joke }}</div>
    </div>
    <div
      class="joke-card animate__animated next"
      :class="next ? 'animate__backInRight' : 'animate__backOutLeft'"
      v-show="next"
      @click="initLoad"
    >
      <div class="title">{{ joke.title }}</div>
      <div class="joke">{{ joke.joke }}</div>
    </div>
    <div class="load-btn" @click="initLoad">换一个</div>
  </div>
</template>
<style lang="less" scoped>
.TenWhy {
  height: 100vh;
  overflow-x: hidden;
  .head-title {
    font-weight: bold;
    text-align: center;
    font-size: 18px;
    line-height: 20px;
    margin-top: 20px;
  }
  .joke-card {
    background-color: #fff;
    height: 40vh;
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.1);
    width: 80%;
    margin: 10%;
    margin-top: none;
    border-radius: 8px;
    padding: 10px;
    .title {
      font-weight: bold;
      text-align: center;
    }
    .joke {
      overflow: scroll;
      height: 90%;
    }
  }
  .load-btn {
    text-align: center;
    font-style: italic;
    text-decoration: underline;
    &:hover {
      color: var(--van-primary-color);
      text-decoration: underline;
    }
  }
}
</style>

