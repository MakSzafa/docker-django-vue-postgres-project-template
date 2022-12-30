<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  beforeCreate() {
    if (localStorage.getItem("accessToken")) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("accessToken");
      this.$store.commit("setIsAuthenticated", true);
    } else {
      axios.defaults.headers.common["Authorization"] = "";
      this.$store.commit("setIsAuthenticated", false);
    }
  },
};
</script>

<style lang="scss">
@import "@/assets/main.scss";
</style>
