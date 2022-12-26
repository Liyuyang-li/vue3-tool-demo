<script setup>
import { store } from "../assets/js/common.js";
import { onMounted, ref, reactive, watch } from "vue";
import { get, post } from "../assets/js/axios.js";
import { useRouter } from "vue-router";
import { ImagePreview ,Toast} from "vant";
const router = useRouter();
const joke = ref({ title: "标题", joke: "你就是个笑话！" });
const jokeShow = ref(true);
const prev = ref(true);
const next = ref(false);

async function onLoad() {
  let params = { key: "192299f12ff4f65053783ab28f3c5030" };
  await get(`https://apis.tianapi.com/pyqwenan/index`, params).then((res) => {
    if (res.code==200) {
        joke.value.title = res.result.source;
        joke.value.joke = res.result.content;
    } else {
    }
  });

}
function initLoad() {
  prev.value = !prev.value;
  next.value = !next.value;
  onLoad();
}
function copyFunction(data) {
    let copyInput = document.createElement("input"); //创建input元素
    document.body.appendChild(copyInput); //向页面底部追加输入框
    copyInput.setAttribute("value", data); //添加属性，将需要复制的内容赋值给input元素的value属性
    copyInput.select(); //选择input元素
    document.execCommand("Copy", false, null); //执行复制命令(指令参数, 交互方式参数如果是true的话将显示对话框, 动态参数一般为一可用值或属性值)
    Toast('复制成功');
    //复制之后再删除元素，否则无法成功赋值
    copyInput.remove(); //删除动态创建的节点
}

onMounted(() => {onLoad();});
</script>
<template>
  <div class="MomentsCopywriting bg-img-blur">
    <div class="head-title">朋友圈文案</div>
    <div
      class="joke-card animate__animated prev"
      :class="prev ? 'animate__backInRight' : 'animate__backOutLeft'"
      v-show="prev"
      @click="initLoad"
    >
      <div class="title">{{ joke.title }}</div>
      <div class="joke">{{ joke.joke }}</div>
      <span class="copy-box" @click.stop="copyFunction(joke.joke)"><van-icon name="orders-o" size="20"/>copy</span>
    </div>
    <div
      class="joke-card animate__animated next"
      :class="next ? 'animate__backInRight' : 'animate__backOutLeft'"
      v-show="next"
      @click="initLoad"
    >
      <div class="title">{{ joke.title }}</div>
      <div class="joke">{{ joke.joke }}</div>
      <span class="copy-box" @click.stop="copyFunction(joke.joke)"><van-icon name="orders-o" size="20"/>copy</span>
    </div>
    <div class="load-btn" @click="initLoad">换一句</div>
  </div>
</template>
<style lang="less" scoped>
.MomentsCopywriting {
  height:100vh;
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
  .copy-box{
    display: block;
    width: 25px;
    height: 20px;
    position: absolute;
    bottom: 15px;
    right: 10px;
    font-size: 8px;
    text-align: center;
    line-height: 8px;
  }
}
</style>

