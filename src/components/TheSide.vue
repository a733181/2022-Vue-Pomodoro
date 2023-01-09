<template lang="pug">
div.bg-secondary.h-100.pt-10
  RouterLink(to="/")
    img.d-block.w-25.mx-auto(src="@/assets/svg/home.svg", alt="home")
  RouterLink(to="/list")
    img.d-block.mt-5.w-25.mx-auto(src="@/assets/svg/list.svg", alt="list")
  RouterLink(to="/settings")
    img.d-block.mt-5.w-25.mx-auto(src="@/assets/svg/library_music.svg", alt="settings")
  img.d-block.mt-6.w-25.mx-auto(v-if="!notify" src="@/assets/svg/bell.svg", alt="bell" @click="toggleNotify")
  img.d-block.mt-6.w-25.mx-auto(v-else src="@/assets/svg/unbell.svg", alt="unbell" @click="toggleNotify")
</template>

<script setup>
import useSettingsStore from '@/stores/settings';
import { storeToRefs } from 'pinia';

const settings = useSettingsStore();
const { notify } = storeToRefs(settings);
const { toggleNotify } = settings;
</script>

<style scoped>
img:hover {
  filter: brightness(0) saturate(100%) invert(38%) sepia(80%) saturate(2362%) hue-rotate(316deg)
    brightness(103%) contrast(101%);
}
</style>
