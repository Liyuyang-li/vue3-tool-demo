<template>
  <div class="about">
   
    <h1>This is an about page</h1>
    <div>store{{ store.count }}</div>
    <van-button type="primary" @click="init">切换文案</van-button>
    <van-collapse v-model="activeNames" accordion>
      <van-collapse-item :title="wenanTitle" name="1">
        {{ wenan }}
      </van-collapse-item>
      <van-collapse-item
        :title="item.quetion"
        :name="i + 2"
        v-for="(item, i) in tenwhys"
        :key="i"
      >
        {{ item.answer }}
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script setup>
import { useMouse, store } from "../assets/js/mouse.js";
import { onMounted, ref, reactive } from "vue";
import { get, post } from "../assets/js/axios.js";
const active = ref(0);

const activeId = ref(1);
const activeIndex = ref(0);
const items = [
  {
    text: "浙江",
    children: [
      { text: "杭州", id: 1 },
      { text: "温州", id: 2 },
    ],
  },
  {
    text: "江苏",
    children: [
      { text: "南京", id: 5 },
      { text: "无锡", id: 6 },
    ],
  },
];
const activeNames = ref(["1"]);
const wenan = ref("");
const wenanTitle = ref("");
const tenwhys = ref([]);

async function onLoad() {
  // 调用api接口，并且提供了两个参数
  await get("/pyqwenan/index", {
    key: "192299f12ff4f65053783ab28f3c5030",
  }).then((res) => {
    wenan.value = res.result.content;
    wenanTitle.value = res.result.source;
    console.log(res);
  });
}
async function tenwhy() {
  // 调用api接口，并且提供了两个参数
  await get("/tenwhy/index", {
    key: "192299f12ff4f65053783ab28f3c5030",
  }).then((res) => {
    tenwhys.value.push({
      quetion: res.result.list[0].title,
      answer: res.result.list[0].content,
    });
  });
}

function init() {
  onLoad();
  tenwhy();
}
onMounted(() => {
  init();
});
</script>
<style>
</style>
