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
  { name: "猫", isSelect: false },
  { name: "动漫", isSelect: false },
  { name: "美女", isSelect: false },
  { name: "二次元", isSelect: false },
  { name: "风景", isSelect: false },
  { name: "手机壁纸", isSelect: false },
  { name: "LOL", isSelect: false },
  { name: "Bing", isSelect: false },
  
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
const list = ref({
  acgimg: [],
  girl: [],
  view: [],
  lolskin: [],
  bing: [],
  "mobil.girl": [],
  cat: [],
});
const loading = ref(false);
const finished = ref(false);
const sort = ref("cat");
const count = ref(0);

function onClickLeft() {
  router.back();
}
function onSearch(val) {
  console.log("val", val);
}
function tottleTag(item, i) {
  count.value++;
  classifiction.value.forEach((v) => {
    v.isSelect = false;
  });
  classifiction.value[i].isSelect = !item.isSelect;

  let selected = item.name;
  sort.value = selected.includes("二次元")
    ? "acgimg"
    : selected.includes("动漫")
    ? "acgimg"
    : selected.includes("美女")
    ? "girl"
    : selected.includes("风景")
    ? "view"
    : selected.includes("手机壁纸")
    ? "mobil.girl"
    : selected.includes("LOL")
    ? "lolskin"
    : selected.includes("Bing")
    ? "bing"
    : selected.includes("猫")
    ? "cat"
    : "cat";

  console.log("sort.value", sort.value);
  if (!selectedClassifiction.value.join().includes(item.name)) {
    initLoad();
  }
  selectedClassifiction.value.push(item.name);
}
async function onLoad() {
  let params = { type: "json" };
  let url =
    sort.value == "cat"
      ? "https://api.thecatapi.com/v1/images/search?limit=10"
      : `https://api.vvhan.com/api/${sort.value}`;
  await get(url, params).then((res) => {
    if (res.success || res.length > 0) {
      console.log(">>>", window.location.href);
      loading.value = false;
      let obj = {};
      if (sort.value == "bing") {
        obj.imgurl = res.data.url;
        list.value[sort.value].push(obj);
      } else if (sort.value == "cat") {
        res.forEach((v) => {
          list.value[sort.value].push({ imgurl: v.url });
        });
      }else if (sort.value == "lolskin") {
        obj.imgurl = "data:image/jpeg;base64,"+res;
        list.value[sort.value].push(obj);
      } else {
        obj.imgurl = res.imgurl;
        list.value[sort.value].push(obj);
      }
      console.log('>>>>>',list.value[sort.value])
    } else {
      loading.value = false;
    }
    if (list.value[sort.value].length >= 10) {
      finished.value = true;
    }
  });
}
function initLoad() {
  window.scrollTo(0, 0);
  list.value[sort.value] = [];
  loading.value = true;
  finished.value = false;
  onLoad();
}
function imagePreview(index) {
  let arr = [];
  list.value[sort.value].forEach((v) => {
    arr.push(v.imgurl);
  });
  ImagePreview({
    images: arr,
    startPosition: index,
  });
}
// 可以直接侦听一个 ref
// watch(
//   classifiction,
//   (newclassifiction, oldclassifiction) => {
//     selectedClassifiction.value = [];
//     newclassifiction.forEach((v) => {
//       if (v.isSelect) {
//         selectedClassifiction.value.push(v.name);
//       }
//     });
//   },
//   { deep: true }
// );
watch(searchValue, (newsearchValue) => {
  selectedClassifiction.value = [];
  selectedClassifiction.value.push(newsearchValue);
  initLoad();
});
onMounted(() => {
});
</script>
<template>
  <div class="MobileWallpaper">
    <div class="fix-box">
      <van-nav-bar
        title="精美壁纸"
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
        v-for="(item, i) in list[sort]"
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
    text-decoration: underline;
    &:hover {
      color: var(--van-primary-color);
      text-decoration: underline;
    }
  }
}
</style>

