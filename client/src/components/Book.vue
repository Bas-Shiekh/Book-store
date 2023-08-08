<template>
  <v-container>
    <h1>sdadsasdasda</h1>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Book',
  mounted() {
    Vue.axios.get("/books", { withCredentials: true })
      .then((res) => console.log(res))
  },
})
</script>