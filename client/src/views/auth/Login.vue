<template>
  <v-container fluid>
    <login-form-app></login-form-app>
  </v-container>
</template>

<script>
import Vue from 'vue'
import '../../../assets/main.css'

import LoginForm from '../../components/Forms/LoginForm.vue'

export default Vue.extend({
  name: "Login",
  components: {
    "login-form-app": LoginForm,
  },
});
</script>