<template>
  <div class="List Container" style="height:88%;padding:15px 0px">
    <InputSearch typeList="list" />
    <div v-if="pokemons == ''">
      <div class="Message__empty">
        <h3>Uh-oh!</h3>
        <p>You look lost on your journey!</p>
        <router-link to="/" class="btn button-primary waves-effect waves-light">
          Go back home
        </router-link>
      </div>
    </div>
    <div v-else>
      <div class="Table Container__table">
        <table>
          <tr v-for="(pokemon, idx) in pokemons" :key="idx">
            <ItemPokemon :pokemon="pokemon" :idpokemon="idx" />
          </tr>
        </table>
      </div>
    </div>
    <div id="modal1" class="modal modal modal-fixed-footer">
      <div class="modal-content">
        <i class="modal-close material-icons">cancel</i>
        <div class="cover__Page">
          <img
            class="back__image"
            :src="require('../assets/images/coverpage.png')"
            alt="coverpage"
          />
          <img
            class="front_pokemon"
            :src="`${selectPokemon.image}`"
            alt="pokemon"
          />
        </div>
        <div class="info__pokemon">
          <table>
            <tr>
              <td>
                <b>Name:</b> <span>{{ selectPokemon.name }}</span>
              </td>
            </tr>
            <tr>
              <td><b>Weight:</b> {{ selectPokemon.weight }}</td>
            </tr>
            <tr>
              <td><b>Height:</b> {{ selectPokemon.height }}</td>
            </tr>
            <tr>
              <td>
                <b style="margin-right: 5px">Type:</b>
                <span v-for="(type, idx) in selectPokemon.type" :key="idx">
                  {{ type.type.name }},
                </span>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="modal-footer">
        <button
          @click="copyAtributes(selectPokemon)"
          class="btn button-primary left waves-effect waves-light"
        >
          Share to my friends
        </button>

        <div v-if="validFavorite(favorites, selectPokemon.name) === true">
          <button
            class="btn button-start right waves-effect waves-red"
            style="margin:0px;"
          >
            <i class="material-icons dp48" style="color:#eca539">star</i>
          </button>
        </div>
        <div v-else>
          <button
            @click="addFavorite(selectPokemon)"
            class="btn button-start right waves-effect waves-red"
            style="margin:0px;"
          >
            <i class="material-icons">start</i>
          </button>
        </div>
      </div>
    </div>
  </div>

  <MenuBar />
</template>
<script>
import InputSearch from "../components/InputSearch";
import MenuBar from "../components/MenuBar";
import ItemPokemon from "../components/Table";
import Load from "../components/Loading";

import { reactive, toRefs, computed, onMounted } from "vue";

import { mapState, mapMutations, useStore } from "vuex";

export default {
  computed: {
    ...mapState(["pokemons", "selectPokemon", "favorites"]),
  },
  components: {
    InputSearch,
    MenuBar,
    ItemPokemon,
    Load,
  },
  setup() {
    const store = useStore();
    const pokemons = computed(() => {
      return store.getters.allpokemon;
    });

    const addFavorite = (pokemon) => {
      M.toast({ html: `${pokemon.name} was added to favorites` });
      store.dispatch("addFavorite", pokemon);
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

    const copyAtributes = async (pokemon) => {
      M.toast({ html: `${pokemon.name} attributes was copied to clipboard` });

      var atrr = "";
      pokemon.atributes.map((atrb) => {
        atrr += atrb.ability.name + ", ";
      });

      var aux = document.createElement("div");
      aux.setAttribute("contentEditable", true);
      aux.innerHTML = `${pokemon.name.toUpperCase()}: ${atrr.toUpperCase()}`;
      aux.setAttribute(
        "onfocus",
        "document.execCommand('selectAll',false,null)"
      );
      document.body.appendChild(aux);
      aux.focus();
      document.execCommand("copy");
      document.body.removeChild(aux);
    };

    onMounted(async () => {
      await store.dispatch("getPokemons");
      store.dispatch("getPokemons");
      await store.dispatch("filtrarPokemon", "");
    });

    return { pokemons, addFavorite, validFavorite, copyAtributes };
  },
};
</script>
<style scoped></style>
