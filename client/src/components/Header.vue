<template>
  <v-container>
    <v-app-bar app dark color="#323850" flat>
      <v-toolbar-title>Book Manage</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-list-item-avatar
        class="d-block text-center mx-auto border_img"
        size="40"
      >
        <img v-bind:src="$props.image" v-bind:alt="$props.firstName" />
      </v-list-item-avatar>
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
})
</script>