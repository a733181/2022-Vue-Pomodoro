<template lang="pug">
v-row
  v-col(lg="7")
    Input.mt-10
    h1.title {{ currentText }}
    h2.time {{ showTime }}
    div.d-block.d-lg-none
      img.svg(v-if="status !== 1 " src="@/assets/svg/play_fill.svg", alt="play" @click="startTimer")
      img.svg(v-else src="@/assets/svg/pause.svg",alt="pause" @click="pauseTimer")
      img.svg(v-if="currentItem.length > 0" src="@/assets/svg/next.svg",alt="next" @click="finishedTimer")
    ul(v-if="contentText")
      li.item(v-for="item in contentText" :key="item.id") {{ item.value }}
  v-col(lg="5").d-none.d-lg-block
    TimeRound
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import Input from '@/components/TheInput.vue';
import TimeRound from '@/components/TimeRound.vue';

import useListStore from '@/stores/list';

const list = useListStore();
const { items, timeleft, currentItem, status } = storeToRefs(list);
const { startTimer, pauseTimer, finishedTimer } = list;

const currentText = computed(() => {
  if (currentItem.value === '') {
    return items.value.length === 0 ? '沒有事項' : items.value[0].value;
  }
  return currentItem.value;
});

const contentText = computed(() => {
  const data = JSON.parse(JSON.stringify(items.value)).splice(0, 4);
  return data.length > 0 ? data : [];
});

const showTime = computed(() => {
  const min = Math.floor(timeleft.value / 60)
    .toString()
    .padStart(2, 0);
  const sec = (timeleft.value % 60).toString().padStart(2, 0);
  return `${min} : ${sec}`;
});
</script>

<style scoped>
ul {
  list-style: none;
}
.title {
  margin-top: 100px;
  position: relative;
  margin-left: 64px;
  font-weight: bold;
  font-size: 24px;
  color: rgb(var(--v-theme-secondary));
  margin-bottom: 20px;
}
.title:before {
  content: '';
  position: absolute;
  width: 48px;
  height: 48px;
  border: 2px solid rgb(var(--v-theme-secondary));
  border-radius: 50%;
  top: 0;
  left: -64px;
}
.title::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  border: 1px solid rgb(var(--v-theme-primary));
  border-radius: 50%;
  left: 0;
  top: 35px;
}
.time {
  font-size: 100px;
  line-height: 100px;
  color: rgb(var(--v-theme-primary));
  font-weight: bold;
  margin-bottom: 10px;
}
@media (min-width: 992px) {
  .time {
    font-size: 150px;
    line-height: 150px;
  }
}
@media (min-width: 1280px) {
  .time {
    font-size: 150px;
    line-height: 150px;
    margin-bottom: 110px;
  }
}
.item {
  border-bottom: 1px solid rgb(var(--v-theme-secondary));
  color: rgb(var(--v-theme-secondary));
  font-weight: bold;
  font-size: 30px;
  margin-top: 10px;
}
.svg {
  width: 30px;
  height: 30px;
  filter: brightness(0) saturate(100%) invert(38%) sepia(80%) saturate(2362%) hue-rotate(316deg)
    brightness(103%) contrast(101%);
}
.svg:hover {
  filter: brightness(0) saturate(100%) invert(15%) sepia(81%) saturate(1483%) hue-rotate(187deg)
    brightness(95%) contrast(108%);
}
</style>
