import { createStore } from "vuex";

export default createStore({
  state: {
    pokemons: [],
    filteredPokemon: [],
    selectPokemon: [],
    favorites: [],
    filterFavorites: [],
    text: "",
    urlIdLookup: {},
    load: 0,
  },
  mutations: {
    setPokemons(state, payload) {
      state.pokemons = payload;
    },
    setPokemonsFiltrados(state, payload) {
      state.filteredPokemon = payload;
    },
    setPokemonsSelect(state, payload) {
      state.selectPokemon = payload;
    },
    initFavorites(state, payload) {
      state.favorites = payload;
    },
    setFavorites(state, payload) {
      state.favorites.push(payload);
    },
    setPokemonsFiltradosFavorite(state, payload) {
      state.filterFavorites = payload;
    },
    setLoad(state, payload) {
      state.load = payload;
    },
    deleteFavorites(state, payload) {
      //state.favorites.splice(payload, 1);
    },
  },
  actions: {
    async getPokemons({ commit }) {
      try {
        const res = await fetch(
          "https://pokeapi.co/api/v2/pokemon?offset=0&limit=50"
        );
        const data = await res.json();

        commit("setPokemons", data.results);
      } catch (err) {
        console.log(err);
      }
    },
    filtrarPokemon({ commit, state }, namePokemon) {
      const texto = namePokemon.toLowerCase();
      const filtro = state.pokemons.filter((pokemon) => {
        const textoApi = pokemon.name.toLowerCase();
        if (textoApi.includes(texto)) {
          return pokemon;
        }
      });
      commit("setPokemonsFiltrados", filtro);
    },
    filtrarPokemonFavorites({ commit, state }, namePokemon) {
      const texto = namePokemon.toLowerCase();
      const filtro = state.favorites.filter((pokemon) => {
        const textoApi = pokemon.name.toLowerCase();
        if (textoApi.includes(texto)) {
          return pokemon;
        }
      });

      commit("setPokemonsFiltradosFavorite", filtro);
    },
    async getSelectPokemon({ commit, state }, namePokemon) {
      try {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${namePokemon}`
        );
        const data = await res.json();

        const pokemon = {
          id: data.id,
          name: data.name,
          weight: data.weight,
          height: data.height,
          type: data.types,
          image: data.sprites.front_default,
          atributes: data.abilities,
        };

        commit("setPokemonsSelect", pokemon);
      } catch (err) {
        console.log(err);
      }
    },
    getFavorites({ commit, state }) {
      commit("initFavorites", state.favorites);
    },
    addFavorite({ commit, state }, namePokemon) {
      commit("setFavorites", namePokemon);
    },
    deleteFavorite({ commit, state }, id) {
      commit("deleteFavorites", id);
    },
    setLoad({ commit, state }, flag) {
      commit("setLoad", flag);
    },
  },
  getters: {
    allpokemon(state) {
      return state.filteredPokemon;
    },
    allFavorites(state) {
      return state.filterFavorites;
    },
    selectedPokemon(state) {
      return state.selectPokemon;
    },
  },

  modules: {},
});
