<template>
  <div class="Container AlignCenter">
    <div class="Welcome">
      <img :src="require('../assets/images/pikachu.png')" alt="pikachu" />
      <h4>Welcome to Pokédex</h4>
      <p>
        The digital encyclopedia created by Professor Oak is an invaluable tool
        to Trainers in the Pokémon world.
      </p>

      <router-link
        to="/list"
        class="btn button-primary waves-effect waves-light"
      >
        Get started
      </router-link>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive, toRefs, computed } from "vue";

export default {
  name: "Welcome",
};
</script>

<style scoped>
h4 {
  font-weight: bold;
  font-size: 26px;
  color: #353535;
  margin: 73px auto auto;
}

p {
  font-size: 18px;
  line-height: 150%;
  width: 80%;
  margin: 30px auto;
}

.AlignCenter {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
}
</style>
