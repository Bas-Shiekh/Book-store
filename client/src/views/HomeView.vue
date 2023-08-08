<template>
  <h1>dasda</h1>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({
    name: 'Home',
    async mounted() {
      try {
        await Vue.axios.get("http://localhost:5050/api/v1/auth/users/me")
      .then((res) => console.log(res))
      } catch (error) {
        console.log(error)
      }
    
  },
  })
</script>
