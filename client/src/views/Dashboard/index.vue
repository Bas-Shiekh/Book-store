<template>
  <v-app>
    <v-container>
      <header-dashboard-app
        v-bind:id="userData.id"
        v-bind:firstName="userData.firstName"
        v-bind:lastName="userData.lastName"
        v-bind:email="userData.email"
        v-bind:image="userData.image"
        v-bind:toggleDrawer="toggleDrawer"
      />
      <router-view></router-view>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "../../components/Header.vue";

export default Vue.extend({
  name: "dashboard",
  components: {
    "header-dashboard-app": Header,
  },
  data: () => ({
    userData: {
      id: null,
      firstName: null,
      lastName: null,
      email: null,
      image: null,
    },
    drawer: true
  }),
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    }
  },
  mounted() {
    if (!this.$store.state.user) this.$router.push("/login")
    else this.userData = this.$store.state.user
  }
});
</script>
