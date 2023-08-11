<template>
  <v-container>
    <h1>شسيشسيشسيش</h1>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'book',
  mounted() {
    Vue.axios.get("/books")
      .then((res) => console.log(res))
  },
})
</script>