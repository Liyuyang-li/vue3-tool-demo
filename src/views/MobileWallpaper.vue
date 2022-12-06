<script setup>
import { store } from "../assets/js/common.js";
import { onMounted, ref, reactive, watch } from "vue";
import { get, post } from "../assets/js/axios.js";
import { useRouter } from "vue-router";
import { ImagePreview } from "vant";
const router = useRouter();
const wenan = ref("");
const wenanTitle = ref("");
const tenwhys = ref([]);
const searchValue = ref();
const classifiction = ref([
  { name: "动漫", isSelect: false },
  { name: "美女", isSelect: false },
  { name: "二次元", isSelect: false },
  { name: "风景", isSelect: false },
]);
const selectedClassifiction = ref([]);
const colors = ref([
  "#bc64a4",
  "#5c9291",
  "#8b968d",
  "#b98c46",
  "#f5b1aa",
  "#d3ccd6",
]);
const list = ref([]);
const loading = ref(false);
const finished = ref(false);

async function onLoad1() {
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
function onClickLeft() {
  router.back();
}
function onSearch(val) {
  console.log("val", val);
}
function tottleTag(item, i) {
  classifiction.value.forEach(v=>{
    v.isSelect = false;
  })
  classifiction.value[i].isSelect = !item.isSelect;

}

async function onLoad() {
  let params = { type: "json" };
  let sort = "acgimg";
  let selected = selectedClassifiction.value.toString();
  if (selectedClassifiction.value.length > 0) {
    sort = selected.includes("二次元")
      ? "acgimg"
      : selected.includes("动漫")
      ? "acgimg"
      : selected.includes("美女")
      ? "girl"
       : selected.includes("风景")
      ? "view"
      : "acgimg";
  }
  await get(`https://api.vvhan.com/api/${sort}`, params).then((res) => {
    console.log(res);
    if (res.success) {
      loading.value = false;
      let obj = res.info;
      obj.imgurl = res.imgurl;
      list.value.push(obj);
    } else {
      loading.value = false;
    }
  });
  if (list.value.length == 5) {
    finished.value = true;
  }
}
function initLoad() {
  list.value = [];
  loading.value = true;
  onLoad();
}

function imagePreview(index) {
  let arr = [];
  list.value.forEach((v) => {
    arr.push(v.imgurl);
  });
  ImagePreview({
    images: arr,
    startPosition: index,
  });
}
// 可以直接侦听一个 ref
watch(
  classifiction,
  (newclassifiction, oldclassifiction) => {
    selectedClassifiction.value = [];
    newclassifiction.forEach((v) => {
      if (v.isSelect) {
        selectedClassifiction.value.push(v.name);
      }
    });
    console.log(selectedClassifiction.value);
  },
  { deep: true }
);
onMounted(() => {
  // init();
});
</script>
<template>
  <div class="MobileWallpaper">
    <div class="fix-box">
      <van-nav-bar
        title="手机壁纸"
        left-text=""
        left-arrow
        @click-left="onClickLeft"
      />
      <van-search
        v-model="searchValue"
        shape="round"
        placeholder="请输入搜索关键词"
        autofocus
        @search="onSearch"
      />
      <div class="classifiction">
        <van-tag
          :plain="!item.isSelect"
          type="primary"
          size="large"
          :color="colors[i]"
          v-for="(item, i) in classifiction"
          :key="i"
          @click="tottleTag(item, i)"
          >{{ item.name }}</van-tag
        >
      </div>
    </div>

    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text=""
      @load="onLoad"
    >
      <div
        class="img-box"
        v-for="(item, i) in list"
        :key="item"
        @click="imagePreview(i)"
      >
        <img :src="item.imgurl" alt="" />
      </div>
    </van-list>
    <div class="load-btn" @click="initLoad">换一批</div>
  </div>
</template>
<style lang="less" scoped>
.MobileWallpaper {
  .classifiction {
    padding: 0 20px;
    :deep(.van-tag) {
      margin: 0 5px 5px 0;
    }
  }
  .img-box {
    margin: 10px;
    width: calc(100vw - 20px);
    img {
      width: 100%;
    }
  }
  .fix-box {
    position: fixed;
    width: 100vw;
    top: 0;
    z-index: 999;
    background-color: #fff;
  }
  :deep(.van-list) {
    margin-top: 140px;
    background-color: #fff;
  }
  .load-btn {
    text-align: center;
    font-style: italic;
    &:hover {
      color: var(--van-primary-color);
      text-decoration: underline;
    }
  }
}
</style>

