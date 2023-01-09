<template lang="pug">
div.position-relative
  v-text-field(label="新增待辦事項"  variant="outlined" :rules="[rules.required,rules.length]" ref="inputField" @keydown.enter="onInputSubmit" )
  img.field-add.position-absolute.position(src="@/assets/svg/plus-solid.svg" @click="onInputSubmit")
</template>

<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import useListStore from '@/stores/list';

const list = useListStore();
const { addItem } = list;
const { items, finishedItems } = storeToRefs(list);

const inputField = ref(null);
const rules = {
  required(v) {
    return !!v || '欄位必填';
  },
  length(v) {
    return v.length >= 3 || '必須是三個字以上';
  },
};

const onInputSubmit = async () => {
  const valid = await inputField.value.validate();
  if (valid.length > 0) return;
  const { value } = inputField.value;
  addItem(value);
  inputField.value.$el.querySelector('input').blur();
  inputField.value.reset();
};
</script>

<style>
.v-label {
  color: rgb(var(--v-theme-primary));
}
.v-field__field {
  background-color: white;
}
.field-add {
  width: 20px;
  height: 20px;
}
.field-add:hover {
  filter: brightness(0) saturate(100%) invert(15%) sepia(81%) saturate(1483%) hue-rotate(187deg)
    brightness(95%) contrast(108%);
}
.position {
  top: 23%;
  right: 20px;
}
</style>
