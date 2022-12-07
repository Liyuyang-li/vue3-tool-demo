<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <!-- <keep-alive><RouterView /></keep-alive> -->
  <RouterView v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </RouterView>
</template>


