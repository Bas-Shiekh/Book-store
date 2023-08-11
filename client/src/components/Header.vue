<template>
  <v-container>
    <v-app-bar app dark color="#323850" flat>
      <v-app-bar-nav-icon @click="$props.toggleDrawer" v-if="showMenuIcon">
        <v-icon v-text="menuIcon"></v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text small class="withoutupercase gray--text">
        Hi, {{ $props.firstName }}
        <v-icon small>mdi-chevron-down</v-icon>
      </v-btn>
    </v-app-bar>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

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
    }
  },
  name: 'Header',
  data() {
    return {
      drawer: false,
      showMenuIcon: true,
      title: 'Book Manage',
      menuIcon: "mdi-menu"
    };
  },
})
</script>