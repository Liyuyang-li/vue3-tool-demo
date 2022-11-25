//组合式风格
<script setup>
import { useMouse, store } from "../assets/js/mouse.js";
import { onMounted, ref, reactive } from "vue";
// import { $ref } from 'vue/macros';//响应式语法糖，未开放
const active = ref(0);
</script>

<template>
  <div class="home">
    <van-nav-bar title="工具合集" />
    <div class="main">
      <van-sidebar v-model="active">
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
        <van-sidebar-item title="标签名称" />
      </van-sidebar>
      <div class="cotent">内容区</div>
    </div>
  </div>
</template>
<style scoped>
.home {
  height: 100vh;
}
.main {
  display: flex;
  height: calc(100vh - 46px);
}
.cotent {
  flex: 1;
}
.van-sidebar {
  background: #f7f8fa;
}
.van-sidebar-item {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>