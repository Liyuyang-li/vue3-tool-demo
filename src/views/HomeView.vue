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
  <div class="home">
    <van-nav-bar title="工具合集" />
    <div class="snow" @click="loadSnow">
      <img src="@/assets/images/snow.png" alt="" />
    </div>
    <div class="main">
      <van-sidebar v-model="active">
        <van-sidebar-item title="娱乐工具" />
      </van-sidebar>
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
    </div>
  </div>
</template>
<style lang="less" scoped>
.home {
  height: 100vh;
}
.main {
  display: flex;
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
  padding: 15px;
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
</style>