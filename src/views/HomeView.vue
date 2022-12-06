//组合式风格
<script setup>
import { store } from "../assets/js/common.js";
import { onMounted, ref, reactive } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
// import { $ref } from 'vue/macros';//响应式语法糖，未开放
const active = ref(0);
const tools = ref([
  { message: "手机壁纸", router: "MobileWallpaper" },
  { message: "音乐", router: "" },
]);

function clickItem(item) {
  console.log("????", router);
  router.push(item.router);
}
</script>

<template>
  <div class="home">
    <van-nav-bar title="工具合集" />
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