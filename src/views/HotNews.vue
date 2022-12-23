<script setup>
import { store } from "../assets/js/common.js";
import { onMounted, ref, reactive, watch } from "vue";
import { get, post } from "../assets/js/axios.js";
import { useRouter } from "vue-router";
import { ImagePreview } from "vant";
import NewsItem from "@/components/NewsItem.vue";

const router = useRouter();
const searchValue = ref("");

const list = ref([
  {
    ctime: "2020-03-08 14:26",
    title: "超级漂亮的汉服发型分享！！手残党看过来",
    source: "新浪汉服",
    picUrl:
      "http://n.sinaimg.cn/front20200308ac/136/w576h360/20200308/e140-iqrhckm1619071.jpg",
    url: "https://k.sina.com.cn/article_6090644865_m16b07dd810330140r2.html?from=fashion",
  },
  
]);
const loading = ref(false);
const finished = ref(false);
const sort = ref("acgimg");
const count = ref(0);
const pageSize = ref(50);
const pageNum = ref(0);

function onClickLeft() {
  router.back();
}
function onSearch(val) {
  console.log("val", val);
  initLoad();
}

async function onLoad() {
  pageNum.value++;
  let params = {};
  // let url = `https://v2.alapi.cn/api/new/hanfu?num=${pageSize.value}&page=${pageNum.value}&token=LwExDtUWhF3rH5ib&word=${searchValue.value}`;
  let url = `https://apis.tianapi.com/topnews/index?num=${pageSize.value}&page=${
    pageNum.value
  }&key=192299f12ff4f65053783ab28f3c5030${
    searchValue.value != "" ? "&word=" + searchValue.value : ""
  }`;
  await get(url, params).then((res) => {
    if (res.code == 200) {
      console.log(res.result.list);
      loading.value = false;
      list.value = list.value.concat(res.result.list);
    } else {
      loading.value = false;
      finished.value = true;
    }
    // if (list.value.length >= 10) {
    //   finished.value = true;
    // }
  });
}
function initLoad() {
  list.value = [];
  loading.value = true;
  finished.value = false;
  pageNum.value = 0;
  onLoad();
}
function clickItem(data) {
  console.log("data", data);
  window.open(data.url);
}
onMounted(() => {
  list.value = [];
});
</script>
<template>
  <div class="HotNews">
    <div class="fix-box">
      <van-nav-bar
        title="热点NEWS"
        left-text=""
        left-arrow
        @click-left="onClickLeft"
      />
      <van-search
        v-model="searchValue"
        shape="round"
        placeholder="请输入搜索关键词"
        @search="onSearch"
      />
    </div>

    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text=""
      @load="onLoad"
    >
      <NewsItem
        v-for="(item, i) in list"
        :key="i"
        :data="item"
        @clickItem="clickItem"
      />
    </van-list>
    <!-- <div class="load-btn" @click="initLoad">换一批</div> -->
  </div>
</template>
<style lang="less" scoped>
.HotNews {
  .fix-box {
    position: fixed;
    width: 100vw;
    top: 0;
    z-index: 999;
    background-color: #fff;
  }
  :deep(.van-list) {
    margin-top: 108px;
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

