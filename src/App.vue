<template>
  <div class="Container__Main">
    <div v-if="load == 0">
      <Load />
    </div>
    <router-view />
  </div>
</template>
<script>
import Load from "./components/Loading";

import { mapState, mapMutations, useStore } from "vuex";

export default {
  computed: {
    ...mapState(["load"]),
  },
  components: {
    Load,
  },
  setup() {
    const store = useStore();

    const setTime = (flag) => {
      store.dispatch("setLoad", flag);
    };

    var count = 0;
    const time = setInterval(() => {
      if (count === 3) {
        clearInterval(time);
        setTime(1);
      }
      count++;
    }, 1000);
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");
</style>
