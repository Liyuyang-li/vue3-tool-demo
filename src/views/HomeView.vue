//组合式风格
<script setup>
import { store } from "../assets/js/common.js";
import { onMounted, ref, reactive } from "vue";
import { get, post } from "../assets/js/axios.js";
import { useRouter } from "vue-router";
const router = useRouter();
// import { $ref } from 'vue/macros';//响应式语法糖，未开放
const active = ref(0);
const tools = ref([
  { message: "精美壁纸", router: "MobileWallpaper" },
  { message: "音乐", router: "" },
]);
const textTools = ref([
  { message: "每日一笑", router: "RandomJoke" },
  { message: "朋友圈文案", router: "MomentsCopywriting" },
  { message: "十万个为什么", router: "TenWhy" },
]);
const newsTools = ref([
  { message: "热点NEWS", router: "HotNews" },
  { message: "汉服NEWS", router: "HanfuNews" },
]);
const userfulTools = ref([
  { message: "时间屏幕", router: "TimeWall" },
  { message: "手持弹幕", router: "HandBarrage" },
  { message: "做个决定", router: "MakeDecision" },
]);
const activeNames = ref(["1", "2", "3","4"]);

function clickItem(item) {
  router.push(item.router);
}
function loadSnow() {
  if (document.getElementById("snow").src != "") {
    document.getElementById("snow").src = "";
  }
  if (document.getElementById("snow").src == "") {
    console.log("loadSnow");
    document.getElementById("snow").src = "https://api.vvhan.com/api/snow";
  }
}
</script>
<template>
  <div class="home bg-img-blur">
    <van-nav-bar title="工具合集" />
    <div class="snow" @click="loadSnow">
      <img src="@/assets/images/snow.png" alt="" />
    </div>
    <div class="main">
      <!-- <van-sidebar v-model="active">
        <van-sidebar-item title="娱乐工具" />
      </van-sidebar> -->
      <van-collapse v-model="activeNames" :border="false">
        <van-collapse-item
          title="娱乐工具"
          name="1"
          :border="false"
          icon="graphic"
          size="large"
        >
          <div class="content">
            <div
              class="tool-item"
              v-for="(item, i) in tools"
              :key="i"
              @click="clickItem(item)"
            >
              {{ item.message }}
            </div>
          </div>
        </van-collapse-item>
        <van-collapse-item
          title="文字应用"
          name="2"
          :border="false"
          icon="column"
          size="large"
        >
          <div class="content">
            <div
              class="tool-item"
              v-for="(item, i) in textTools"
              :key="i"
              @click="clickItem(item)"
            >
              {{ item.message }}
            </div>
          </div>
        </van-collapse-item>
        <van-collapse-item
          title="新闻应用"
          name="3"
          :border="false"
          icon="new"
          size="large"
        >
          <div class="content">
            <div
              class="tool-item"
              v-for="(item, i) in newsTools"
              :key="i"
              @click="clickItem(item)"
            >
              {{ item.message }}
            </div>
          </div>
        </van-collapse-item>
        <van-collapse-item
          title="实用工具"
          name="4"
          :border="false"
          icon="new"
          size="large"
        >
          <div class="content">
            <div
              class="tool-item"
              v-for="(item, i) in userfulTools"
              :key="i"
              @click="clickItem(item)"
            >
              {{ item.message }}
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </div>
</template>
<style lang="less" scoped>
.home {
  height: 100vh;
}
.main {
  height: calc(100vh - 46px);
}
.snow {
  width: 25px;
  height: 25px;
  position: absolute;
  right: 15px;
  top: 10px;
  z-index: 999;
  img {
    width: 100%;
  }
}
.content {
  flex: 1;
  display: flex;
  .tool-item {
    color: var(--van-text-color-2);
    font-size: 14px;
    background-color: var(--vt-c-divider-light-2);
    border-radius: 15px;
    line-height: 30px;
    padding: 0 15px;
    height: max-content;
    margin: 5px;
    &:active {
      background-color: var(--vt-c-divider-light-1);
    }
  }
}
.van-sidebar {
  background: #f7f8fa;
}
.van-sidebar-item {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.van-collapse-item {
  margin-bottom: 8px;
}
:deep(.van-cell__left-icon) {
  // color: var(--van-primary-color);
  color: #e83929;
}
</style>