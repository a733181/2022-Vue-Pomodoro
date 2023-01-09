<template lang="pug">
v-row
  v-col(cols="12")
    h1.text-center 待辦事項
  v-col(cols="12")
    Input
  v-col(cols="12")
    div.d-flex.justify-center.align-center.mb-10
      h2 TO-DO
      img.svg(src="@/assets/svg/arrow.svg", alt="isShow" @click="isToDoShow =!isToDoShow" :class="{'svg-active':isToDoShow}")
    v-table.text-center(v-if="isToDoShow")
      thead
        tr
          th.text-center 名稱
          th.text-center 操作
      tbody
        tr(v-if="items.length === 0")
          td(colspan="2").text-center 沒有事項
        tr(v-for="item in items" :key="item.id")
          td
            v-text-field(v-if="item.edit" v-model="item.model" :rules="[rules.required,rules.length]" autofocus)
            span(v-else) {{ item.value }}
          td
            span(v-if="item.edit")
              v-btn(icon="mdi-check" variant="text" color="green" @click="confirmEditItem(item.id)")
              v-btn(icon="mdi-undo" variant="text" color="red" @click="undoEditItem(item.id)")
            span(v-else)
              v-btn(icon="mdi-pencil" variant="text" color="green" @click="editItem(item.id)")
              v-btn(icon="mdi-delete" variant="text" color="red" @click="deleteItem(item.id)")
  v-divider(class="my-5")
  v-col(cols="12")
    div.d-flex.justify-center.align-center.mb-10
      h2 DONE
      img.svg(src="@/assets/svg/arrow.svg", alt="isShow" @click="isDoneShow =!isDoneShow" :class="{'svg-active':isDoneShow}")
  v-col(cols="12")
    v-table.text-center(v-if="isDoneShow")
      thead
        tr
          th.text-center 名稱
          th.text-center 操作
      tbody
        tr(v-if="finishedItems.length === 0")
          td(colspan="2").text-center 沒有事項
        tr(v-for="item in finishedItems" :key="item.id")
          td {{ item.value }}
          td
            v-btn(icon="mdi-delete" variant="text" color="red" @click="deleteFinishedItem(item.id)")
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import useListStore from '@/stores/list';

import Input from '@/components/TheInput.vue';

const list = useListStore();
const { editItem, deleteItem, undoEditItem, confirmEditItem, deleteFinishedItem } = list;
const { items, finishedItems } = storeToRefs(list);

const isToDoShow = ref(false);
const isDoneShow = ref(false);

const rules = {
  required(v) {
    return !!v || '欄位必填';
  },
  length(v) {
    return v.length >= 3 || '必須是三個字以上';
  },
};
</script>

<style scoped>
.svg {
  width: 30px;
  height: 30px;
  transform: rotate(180deg);
  margin-top: 5px;
}
.svg:hover {
  opacity: 0.6;
}
.svg-active {
  transform: rotate(0);
  margin-top: -5px;
}
</style>
