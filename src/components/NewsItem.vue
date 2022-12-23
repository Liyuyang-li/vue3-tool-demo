<script setup>
import { onMounted, ref, reactive, watch } from "vue";
const props = defineProps(["data"]);
const emit = defineEmits(["click-item"]);
onMounted(() => {});
function clickItem() {
  emit("click-item", props.data);
}
</script>
<template>
  <div class="NewsItem" @click="clickItem">
    <div class="img-box">
      <img :src="data.picUrl" alt="">
    </div>
    <div class="content-box">
      <p class="source">{{data.source}}</p>
      <p class="title">{{data.title}}</p>
    </div>
  </div>
</template>
<style lang="less" scoped>
.NewsItem {
  display: flex;
  padding: 10px;
  // border-radius: 8px;
  align-items: center;
  margin-bottom: 8px;
  background: #fff;
  .img-box{
    width: 25vw;
    height: 10vh;
    img{
      width: 25vw;
      height: 100%;
    }
  }
  .content-box{
    padding-left: 6px;
    .source{
      font-weight: 800;
    }
    .title{
      font-size: 14px;
    }
  }
}
</style>

