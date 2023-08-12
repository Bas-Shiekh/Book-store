<template>
  <v-container>
    <v-app-bar app dark color="#323850" flat>
      <v-toolbar-title>Book Manage</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            small
            class="withoutupercase gray--text"
            v-on="on"
            v-bind="attrs"
          >
            Hi, {{ $props.firstName }}
            <v-icon small>mdi-chevron-down</v-icon>
          </v-btn>
          <v-list-item-avatar
            class="d-block text-center mx-auto border_img"
            size="40"
          >
            <img v-bind:src="$props.image" v-bind:alt="$props.firstName" />
          </v-list-item-avatar>
        </template>
        <v-list>
          <v-btn text class="logout" @click="logout"
            >Logout <v-icon small>mdi-logout</v-icon></v-btn
          >
        </v-list>
      </v-menu>
    </v-app-bar>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  props: {
    id: {
      type: Number,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    image: {
      type: String,
    },
    email: {
      type: String,
    },
    toggleDrawer: {
      type: Function,
    },
  },
  name: "Header",
  methods: {
    async logout() {
      try {
        const { data } = await Vue.axios.post("/auth/logout");
        this.$notify({
          title: "Success",
          text: data.message,
          type: "success",
        });
        this.$store.commit("removeUser")
        this.$router.push("/login")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        this.$notify({
          title: "Error!",
          text: error.response.data.message,
          type: "error",
        });
      }
    },
  },
});
</script>
<style>
.logout {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
</style>
