<template lang="pug">
V-app
  v-main
    v-row
      v-col(cols="10").bg-main
        v-container
          RouterView(v-slot="{ Component }")
            KeepAlive(include="HomeView")
              component(:is="Component")
      v-col(cols="2")
        Side
</template>

<script setup>
import Side from '@/components/TheSide.vue';
</script>

<style scoped>
.bg-main {
  background-color: #ffedf7;
  height: 100vh;
}
.v-row {
  margin: 0;
}
.v-col {
  padding: 0;
}
</style>
