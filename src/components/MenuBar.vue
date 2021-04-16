<template>
  <div class="Container__Menu">
    <div class="Menu__bar Container">
      <router-link
        to="/list"
        class="btn button-default"
        style="margin-right:5px"
      >
        <i class="material-icons">format_list_bulleted</i>
        All
      </router-link>
      <router-link
        to="/favorite"
        class="btn button-default"
        style="margin-left:5px"
      >
        <i class="material-icons">star</i>
        Favorites
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu",
};
</script>

<style scoped></style>
