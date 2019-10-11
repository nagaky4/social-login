<template>
  <v-app id="app">
    <Navbar />
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar/Navbar";
export default {
  name: "App",
  components: {
    Navbar
  },
  props: {
    source: String
  }
};
</script>

<style lang="scss">
.container {
  height: 100%;
}
</style>