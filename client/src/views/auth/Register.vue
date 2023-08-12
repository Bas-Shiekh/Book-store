<template>
  <v-container fluid>
    <register-form-app></register-form-app>
    <notifications position="top right" width="400px" classes="notification" />
  </v-container>
</template>

<script>
import Vue from 'vue'
import '../../../assets/main.css'

import RegisterForm from '../../components/Forms/RegisterForm.vue'

export default Vue.extend({
  name: "Register",
  components: {
    "register-form-app": RegisterForm,
  },
  mounted() {
    if (this.$store.state.user) {
      this.$router.push('/dashboard')
    }
  }
});
</script>