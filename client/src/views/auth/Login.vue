<template>
  <v-container fluid class="page">
    <div class="login-form">
      <p class="form-title">Login to your account</p>
      <login-form-app></login-form-app>
    </div>
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
  mounted() {
    if (this.$store.state.user) {
      this.$router.push('/dashboard')
    }
  }
});
</script>

<style>
.page {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 2rem;
  max-width: 350px;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
  0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>