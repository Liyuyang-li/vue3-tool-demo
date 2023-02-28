<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useRouter } from "vue-router";
const router = useRouter();
console.log("router", router);
</script>

<template>
  <!-- <keep-alive><RouterView /></keep-alive> -->
  <RouterView
    
    v-slot="{ Component }"
  >
    <keep-alive v-if="router.currentRoute._value.meta.keepAlive">
      <component :is="Component" />
    </keep-alive>
    <component v-if="!router.currentRoute._value.meta.keepAlive" :is="Component" />
  </RouterView>
  <!-- <RouterView v-if="!router.currentRoute._value.meta.keepAlive"> </RouterView> -->
</template>


