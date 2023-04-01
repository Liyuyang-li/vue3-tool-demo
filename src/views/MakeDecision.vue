<!--
 * @Author: liyy
 * @Date: 2023-02-24 15:28:33
 * @Description: 
-->

<script setup>
import { store } from "../assets/js/common.js";
import { onMounted, ref, reactive, watch } from "vue";
import { get, post } from "../assets/js/axios.js";
import { useRouter } from "vue-router";
import { ImagePreview, Toast } from "vant";
const router = useRouter();
const text = ref("");
const textSize = ref(50);
const textColor = ref("#fff");
const bgColor = ref("#000");
const turntableArr = ref(["英雄联盟", "王者荣耀", "原神", "qq飞车"]);
const decisionName = ref("打什么游戏");

const onChange = (value) => Toast("当前值：" + value);

function onClickLeft() {
  router.back();
}
function showText() {
  if (text.value == "") {
    Toast("请输入弹幕文本");
    return;
  }
  router.push({
    path: "/ShowBarrage",
    query: {
      text: text.value,
      textColor: textColor.value,
      bgColor: bgColor.value,
      textSize: textSize.value * 2 + "px",
    },
  });
}

function drawTurntable() {
  // 小圆圈的旋转变换
  let circleList = document.querySelectorAll(".little-circle");
  let len = circleList.length;
  let rotateStep = 360 / len;
  let halfOfRotateStep = rotateStep / 2;
  circleList.forEach(function (item, index) {
    let deg = rotateStep * index + halfOfRotateStep;
    item.style.transform = "rotate(" + deg + "deg)";
    item.style.transformOrigin = "5px calc(40vw + 13px)";
  });
  // 每一个奖品的变换
  let prizeList = document.querySelectorAll(".prize");
  let pLen = prizeList.length;
  let pRotateStep = 360 / pLen;
  let halfOfPRotateStep = pRotateStep / 2;
  prizeList.forEach(function (item, index) {
    item.style.transform = "rotate(" + pRotateStep * index + "deg" + ")";
    item.style.transformOrigin = "right bottom";
  });
  // 奖品的内容变换
  let contentList = document.querySelectorAll(".content");
  contentList.forEach(function (item) {
    // 反向变换，用于抵消div.prize的变形 这里的translate值，其实可以用三角函数算出来，但是太复杂，我就用肉眼观测取了7px 100px这么个值
    item.style.transform = "rotate(-" + halfOfPRotateStep + "deg) ";
    item.style.transformOrigin = "center center";
  });
  let retry = false;
  let num = 0;
  // 抽奖按钮的点击事件
  document.querySelector("#btn").onclick = function () {
    if (retry) {
      retry = false;
      clear();
      document.querySelector("#btn").innerText = "抽奖";
      return;
    }
    // 计算一个随机的度数，转起来，先转上十圈然后再转一圈内的随机度数
    document.querySelector("#btn").style.cursor = "wait";
    num++;
    let deg1 = 360 * 10;
    let deg2 = (Math.floor(Math.random() * 8) + 1) * 45 + 22.5;
    let deg = deg1 + deg2;
    console.log(deg);
    let truntable = document.querySelector(".prize-zone");
    truntable.style.transition = "all 10s ease";
    truntable.style.transform = "rotateZ(-" + deg * num + "deg)";
  };
  // 监听动画完成事件
  document
    .querySelector(".prize-zone")
    .addEventListener("transitionend", function () {
      document.querySelector("#btn").style.cursor = "pointer";
    });
}
const show = ref(false);
const actions = [
  { name: "打什么游戏", value: "1" ,turntableArr:["英雄联盟", "王者荣耀", "原神", "qq飞车"]},
  { name: "早上吃什么", value: "2" ,turntableArr:["小笼包", "手抓饼", "豆浆鸡蛋", "米粥"]},
  { name: "晚上吃什么", value: "3" ,turntableArr:["盖浇饭", "汉堡薯条", "麻辣烫", "粉丝米线"]},
];
const onSelect = (item) => {
  // 默认情况下点击选项时不会自动收起
  // 可以通过 close-on-click-action 属性开启自动收起
  show.value = false;
  decisionName.value = item.name;
  turntableArr.value = item.turntableArr;
};
onMounted(() => {
  drawTurntable();
});
</script>
<template>
  <div class="MakeDecision">
    <van-nav-bar
      title="做个决定"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="fix-box">
      <div class="select-btn">
        <div class="btn-box" @click="show = !show">{{decisionName}}</div>
        <img style="width: 30px" src="../assets/images/edit.png" alt="" />
      </div>
      <div class="box">
        <div class="turntable">
          <div class="little-circle"></div>
          <div class="little-circle"></div>
          <div class="little-circle"></div>
          <div class="little-circle"></div>
          <div class="little-circle"></div>
          <div class="little-circle"></div>
          <div class="little-circle"></div>
          <div class="little-circle"></div>
          <div class="prize-zone">
            <div
              class="prize"
              v-for="(item, index) in turntableArr"
              :key="index"
            >
              <div class="content">
                <div class="txt">
                  <p>{{ item }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="pointer"></div>
          <div id="btn" class="btn">祈愿</div>
        </div>
      </div>
    </div>
    <van-action-sheet
      v-model:show="show"
      :actions="actions"
      @select="onSelect"
    />
  </div>
</template>
<style lang="less" scoped>
.MakeDecision {
  background-color: #fff;
  height: 100vh;

  .fix-box {
    padding: 0 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    .select-btn {
      display: flex;
      justify-content: center;
      margin-bottom: 60px;
      margin-top: 10px;
      .btn-box {
        margin-left: 30px;
        padding: 5px 30px;
        background-color: #7ebeab;
        border-radius: 8px;
        color: #fff;
        &:active {
          // background-color: #912727;
        }
      }
    }
    .turntable-box {
      width: 90vw;
      height: 90vw;
      border-radius: 50%;
      background-color: #4b99cc;
    }
    .box {
      width: 90vw;
      height: 90vw;
      background-color: #7ebeab;
      border-radius: 50%;
      position: relative;
      padding: 5vw;
    }
    .turntable {
      width: 80vw;
      height: 80vw;
      background-color: red;
      border-radius: 50%;
      position: relative;
      // box-shadow: 0 0 10px #000;
      line-height: 95px;
    }
    .little-circle {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      border: 1px solid black;
      position: absolute;
      left: 50%;
      margin-left: -5px;
      margin-top: -13px;
    }
    .little-circle:nth-child(even) {
      background-color: #98d98e;
    }
    .little-circle:nth-child(odd) {
      background-color: #d6e9ca;
    }
    .prize-zone {
      width: 80vw;
      height: 80vw;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      margin-left: -40vw;
      top: 50%;
      margin-top: -40vw;
      overflow: hidden;
    }
    .prize {
      width: 40vw;
      height: 40vw;
      position: absolute;
      left: 0;
      top: 0;
    }
    .prize:nth-child(odd) {
      background-color: #98d98e;
    }
    .prize:nth-child(even) {
      background-color: #d6e9ca;
    }
    .btn {
      width: 20vw;
      height: 20vw;
      border-radius: 50%;
      position: absolute;
      left: 50%;
      margin-left: -10vw;
      top: 50%;
      margin-top: -10vw;
      background-color: #69b076;
      color: white;
      font-size: 20px;
      font-weight: bolder;
      text-align: center;
      vertical-align: middle;
      cursor: pointer;
      line-height: 20vw;
    }
    .pointer {
      width: 0;
      height: 0;
      position: absolute;
      left: 50%;
      margin-left: -20px;
      top: 50%;
      margin-top: -20vw;
      border-bottom: 80px solid #69b076;
      border-left: 20px solid transparent;
      border-right: 20px solid transparent;
    }
    .content {
      width: 200px;
      height: 250px;
      position: absolute;
      right: -20px;
      bottom: -40px;
      text-align: center;
    }
    .content .thanks {
      width: 34px;
      height: 150px;
      font-size: 30px;
      font-weight: bolder;
      color: white;
      margin: 0 auto;
      line-height: 34px;
      padding-top: 20px;
    }
    .content .img {
      width: 10px;
      height: 10px;
      position: absolute;
      left: 50%;
      margin-left: -40px;
      top: 5%;
    }
    .content img {
      width: 80px;
      height: 100px;
      position: absolute;
    }
    .txt {
      width: 100px;
      height: 50px;
      font-size: 20px;
      line-height: 32px;
      margin: 0 auto;
      padding-top: 120px;
      color: white;
      font-weight: bolder;
    }
  }
  @keyframes myfirst {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(180deg);
    }
  }
}
</style>

