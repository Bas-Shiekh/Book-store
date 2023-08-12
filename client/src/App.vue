<template>
  <v-app>
    <v-main class="main">
      <router-view />
      <notifications position="top right" width="400px" classes="notification" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
})
</script>

<style>
.main {
  background-color: #2A3243;
}
</style>