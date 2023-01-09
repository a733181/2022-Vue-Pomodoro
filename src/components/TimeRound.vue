<template lang="pug">
.round
  img.svg(v-if="status !== 1 " src="@/assets/svg/play_fill.svg", alt="play" @click="startTimer")
  img.svg(v-else src="@/assets/svg/pause.svg",alt="pause" @click="pauseTimer")
  img.svg.next(v-if="currentItem.length > 0" src="@/assets/svg/next.svg",alt="next" @click="finishedTimer")
  span.round--square
  svg.round--svg
    circle.round--outside(cx="270" cy="270" r="270" :style="roundStyle" :class="{ 'round--outside--break':isBreak }")
    circle.round--inside(cx="260" cy="260" r="260" :class="{ 'round-inside--break':isBreak }")
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import useListStore from '@/stores/list';

const list = useListStore();
const { timeleft, setTime, currentItem, status, break: isBreak } = storeToRefs(list);
const { startTimer, pauseTimer, finishedTimer } = list;

const roundStyle = computed(() => {
  return status.value !== 1
    ? 'stroke-dashoffset:1700'
    : `stroke-dashoffset:${(1700 * timeleft.value - 1700) / setTime.value}`;
});
</script>

<style scoped>
.round {
  width: 560px;
  height: 560px;
  transform: rotate(270deg);
  margin: 50px auto;
  position: relative;
}
.round--svg {
  width: 100%;
  height: 100%;
}
.round--outside {
  fill: transparent;
  stroke: rgb(var(--v-theme-primary));
  stroke-width: 5;
  transform: translate(5px, 5px);
  stroke-dasharray: 1700;
}
.round--outside--break {
  stroke: rgb(var(--v-theme-secondary));
}
.round--inside {
  fill: rgb(var(--v-theme-primary));
  transform: translate(15px, 15px);
}
.round-inside--break {
  fill: rgb(var(--v-theme-secondary));
}
.round--play {
  position: absolute;
  width: 96px;
  height: 96px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-270deg);
}
.round--square {
  position: absolute;
  width: 16px;
  height: 16px;
  background-color: white;
  top: 60%;
  left: 41%;
}
.svg {
  position: absolute;
  width: 90px;
  height: 90px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-270deg);
}
.svg:hover {
  opacity: 0.9;
  transform: translate(-50%, -50%) rotate(-270deg) scale(1.1);
}
.next {
  top: 72%;
}
</style>
