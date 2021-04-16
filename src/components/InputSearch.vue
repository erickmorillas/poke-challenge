<template>
  <div class="Container__search input-field ">
    <i class="material-icons prefix">search</i>
    <input
      v-model="texto"
      id="icon_prefix"
      type="text"
      placeholder="Search"
      @keyup="InputProccess(typeList)"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import { mapState, mapMutations, useStore } from "vuex";
export default {
  props: ["typeList"],
  setup() {
    const texto = ref("");
    const store = useStore();

    const InputProccess = async (type) => {
      if (type === "list") {
        await store.dispatch("filtrarPokemon", texto.value);
      } else {
        await store.dispatch("filtrarPokemonFavorites", texto.value);
      }
    };

    return { texto, InputProccess };
  },
};
</script>

<style scoped></style>
