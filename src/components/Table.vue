<template>
  <td class="name" @click="selectPkm(pokemon.name)">{{ pokemon.name }}</td>
  <td class="button">
    <div v-if="validFavorite(favorites, pokemon.name) === true">
      <div class="__favorite factive waves-effect waves-red">
        <i class="material-icons">start</i>
      </div>
    </div>
    <div v-else>
      <div
        @click="addFavorite(pokemon)"
        class="__favorite waves-effect waves-red"
      >
        <i class="material-icons">start</i>
      </div>
    </div>
  </td>
</template>

<script>
import M from "materialize-css/dist/js/materialize.js";
import { mapState, mapMutations, useStore } from "vuex";
export default {
  props: ["pokemon", "idpokemon"],
  computed: {
    ...mapState(["favorites"]),
  },
  setup() {
    const store = useStore();
    const addFavorite = (pokemon) => {
      M.toast({ html: `${pokemon.name} was added to favorites` });
      store.dispatch("addFavorite", pokemon);
    };

    const deleteFavorite = (id) => {
      store.dispatch("deleteFavorite", id);
    };

    const validFavorite = (favorites, pokemon) => {
      var result = [];
      result = favorites.filter((obj) => obj.name == pokemon);

      if (result[0]) {
        return true;
      } else {
        return false;
      }
    };

    const selectPkm = async (pokemon) => {
      await store.dispatch("getSelectPokemon", pokemon);
      M.Modal.init(document.querySelectorAll(".modal"), {});
      var elem = document.getElementById("modal1");
      var instance = M.Modal.getInstance(elem);
      instance.open();
    };

    return { addFavorite, selectPkm, validFavorite, deleteFavorite };
  },
};
</script>

<style scoped></style>
