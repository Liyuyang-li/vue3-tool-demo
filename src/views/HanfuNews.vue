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
  {
    ctime: "2020-03-08 12:28",
    title: "基础的汉服发型教程！非常日常百搭",
    source: "新浪汉服",
    picUrl:
      "http://n.sinaimg.cn/front20200308ac/136/w576h360/20200308/057d-iqrhckm1158631.jpg",
    url: "https://k.sina.com.cn/article_6090644865_m16b07dd810330140n9.html?from=fashion",
  },
  {
    ctime: "2020-03-08 13:27",
    title: "简单易学，只需要一个假发包的汉服发型分享~~",
    source: "新浪汉服",
    picUrl:
      "http://n.sinaimg.cn/front20200308ac/136/w576h360/20200308/7224-iqrhckm1374555.jpg",
    url: "https://k.sina.com.cn/article_6090644865_m16b07dd810330140ox.html?from=fashion",
  },
  {
    ctime: "2020-03-08 02:39",
    title: "DIY手工编绳教程：能快速编织好的蝴蝶流苏挂饰，搭汉服刚刚好",
    source: "新浪汉服",
    picUrl:
      "http://n.sinaimg.cn/sinakd20200308ac/794/w480h314/20200308/a65b-iqmtvwv9042294.jpg",
    url: "https://k.sina.com.cn/article_6441009173_17fea001500100pl8d.html?from=fashion",
  },
  {
    ctime: "2020-03-07 21:02",
    title: "中国穿汉服才能进入的园林，打招呼也用古语，不然就拒绝进入",
    source: "新浪汉服",
    picUrl:
      "http://n.sinaimg.cn/sinakd10121/124/w578h346/20200307/091d-iqmtvwv8350837.jpg",
    url: "https://k.sina.com.cn/article_7203240540_1ad58ba5c00100q7wi.html?from=travel&amp;subch=insurance",
  },
  {
    ctime: "2020-03-07 21:39",
    title: "绝版汉服鲛人泪拆开快递的那一刻整个人都特别兴奋",
    source: "新浪汉服",
    picUrl:
      "http://n.sinaimg.cn/sinakd10121/400/w1280h720/20200307/f6b3-iqmtvwv8472498.jpg",
    url: "https://k.sina.com.cn/article_6793628450_m194ee8b2200100njgw.html?from=ent&amp;subch=variety",
  },
  {
    ctime: "2020-03-07 21:42",
    title: "22岁漂亮女孩求职一身汉服惊艳亮相让企业家直夸好看",
    source: "新浪汉服",
    picUrl:
      "http://n.sinaimg.cn/sinakd10121/400/w1280h720/20200307/fcd8-iqmtvwv8425514.jpg",
    url: "https://k.sina.com.cn/article_6910673993_m19be8844900100xakp.html?from=ent&amp;subch=variety",
  },
  {
    ctime: "2020-03-07 23:44",
    title: "次惑小仙女：拍汉服吃火鸡面+毛豆，居然被表白了",
    source: "新浪汉服",
    picUrl:
      "http://n.sinaimg.cn/front20200307ac/320/w480h640/20200307/29ff-iqmtvwv8786187.jpg",
    url: "https://k.sina.com.cn/article_2932882881_maed03dc103300w6oc.html?from=food",
  },
  {
    ctime: "2020-03-08 00:05",
    title: "美少女cosplay:复古风汉服写真（侵删）",
    source: "新浪汉服",
    picUrl:
      "http://n.sinaimg.cn/sinakd10100/704/w1440h864/20200308/b24c-iqmtvwv8817930.jpg",
    url: "https://k.sina.com.cn/article_7062056909_p1a4ee6fcd00100qq5d.html?from=animation",
  },
  {
    ctime: "2020-03-06 08:51",
    title: "汉服古风：十二楼中尽晓妆，望仙楼上望君王",
    source: "新浪汉服",
    picUrl:
      "http://n.sinaimg.cn/sinakd10108/634/w999h1235/20200306/857d-iqmtvwv1129637.jpg",
    url: "https://k.sina.com.cn/article_6995117639_p1a0f1064700100pruo.html?from=photo",
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
  let url = `https://apis.tianapi.com/hanfu/index?num=${pageSize.value}&page=${
    pageNum.value
  }&key=192299f12ff4f65053783ab28f3c5030${
    searchValue.value != "" ? "&word=" + searchValue.value : ""
  }`;
  await get(url, params).then((res) => {
    if (res.code == 200) {
      console.log(res.result.newslist);
      loading.value = false;
      list.value = list.value.concat(res.result.newslist);
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
  <div class="HanfuNews">
    <div class="fix-box">
      <van-nav-bar
        title="汉服NEWS"
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
.HanfuNews {
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

