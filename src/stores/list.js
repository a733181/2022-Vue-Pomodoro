import { defineStore } from 'pinia';
import useSettingStore from './settings';

const setTime = parseInt(import.meta.env.VITE_TIME);
const setTimeBreak = parseInt(import.meta.env.VITE_TIME_BREAK);
let timer = null;
const useListStore = defineStore({
  id: 'list',
  state() {
    return {
      items: [],
      finishedItems: [],
      currentItem: '',
      id: 1,
      break: false,
      timeleft: setTime,
      setTime: setTime,
      status: 0,
    };
  },
  actions: {
    setting() {
      return useSettingStore();
    },
    addItem(value) {
      this.items.push({
        id: this.id++,
        value,
        edit: false,
        model: value,
      });
    },
    editItem(id) {
      const index = this.findIndexById(id);
      this.items[index].edit = true;
    },
    deleteItem(id) {
      const index = this.findIndexById(id);
      this.items.splice(index, 1);
    },
    undoEditItem(id) {
      const index = this.findIndexById(id);
      this.items[index].model = this.items[index].value;
      this.items[index].edit = false;
    },
    confirmEditItem(id) {
      const index = this.findIndexById(id);
      this.items[index].value = this.items[index].model;
      this.items[index].edit = false;
    },
    findIndexById(id) {
      return this.items.findIndex((obj) => obj.id === id);
    },
    start() {
      this.currentItem = this.break ? '休息一下' : this.items.shift().value;
    },
    startTimer() {
      if (this.status === 0 && this.items.length > 0) {
        this.start();
      }
      if (this.currentItem.length > 0) {
        this.status = 1;
        timer = setInterval(() => {
          this.countDown();
          if (this.timeleft === 0) {
            this.finishedTimer();
          }
        }, 1000);
      }
    },
    finishedTimer() {
      clearInterval(timer);
      this.status = 0;
      const audio = new Audio();
      audio.src = this.setting().selectedAlarmFile;
      audio.play();
      if (this.setting().notify) {
        new Notification('事項完成', {
          body: this.currentText,
          icon: 'https://cdn-icons-png.flaticon.com/512/2693/2693146.png',
        });
      }

      this.finish();
      this.startTimer();
    },
    pauseTimer() {
      this.status = 2;
      clearInterval(timer);
    },
    countDown() {
      this.timeleft--;
    },
    finish() {
      if (!this.break) {
        this.finishedItems.push({
          value: this.currentItem,
          id: this.id++,
        });
      }
      this.currentItem = '';
      if (this.items.length > 0) {
        this.break = !this.break;
      }
      this.timeleft = this.break ? setTimeBreak : setTime;
      this.setTime = this.break ? setTimeBreak : setTime;
    },
    deleteFinishedItem(id) {
      const index = this.finishedItems.findIndex((obj) => obj.id === id);
      this.finishedItems.splice(index, 1);
    },
  },
  persist: {
    key: 'pomodoro-list',
  },
});

export default useListStore;
