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
onMounted(() => {
  Colorpicker.create({
    el: "color-picker-text", //元素id
    color: "#fff", //默认颜色
    change: function (elem, hex) {
      //选中颜色发生改变时事件
      elem.style.backgroundColor = hex;
      textColor.value = hex;
    },
  });
  Colorpicker.create({
    el: "color-picker-background", //元素id
    color: "#000", //默认颜色
    change: function (elem, hex) {
      //选中颜色发生改变时事件
      elem.style.backgroundColor = hex;
      bgColor.value = hex;
    },
  });
});
</script>
<template>
  <div class="HandBarrage">
    <van-nav-bar
      title="手持弹幕"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="fix-box">
      <div class="mini-title">弹幕文本</div>
      <van-field label=" " label-width="1px" v-model="text" :required="true" />
      <div class="mini-title">文本大小</div>
      <div class="text-size">
        <van-slider v-model="textSize" @change="onChange" />
      </div>
      <div class="mini-title">选择颜色</div>
      <div class="color-select">
        <div style="display: flex; margin-right: 60px">
          <div class="color-picker" id="color-picker-text"></div>
          <span>文字颜色</span>
        </div>
        <div style="display: flex">
          <div class="color-picker" id="color-picker-background"></div>
          <span>背景颜色</span>
        </div>
      </div>
      <van-button type="primary" size="large" @click="showText"
        >显示弹幕</van-button
      >
    </div>
  </div>
</template>
<style lang="less" scoped>
.HandBarrage {
  background-color: #fff;
  height: 100vh;

  .fix-box {
    padding: 0 20px;

    .color-select {
      display: flex;
      padding-bottom: 20px;
      .color-picker {
        width: 30px;
        height: 30px;
        border: 1px solid #ccc;
        margin-right: 10px;
      }
    }
    .van-cell {
      padding: 0;
      border-bottom: 1px solid #888;
    }
    .mini-title {
      padding: 10px 0;
    }
    .text-size {
      padding: 20px 0;
    }
  }
}
</style>

