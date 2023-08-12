<template>
  <v-container fluid class="page">
    <div class="register-form">
      <p class="form-title">Create new account</p>
      <register-form-app></register-form-app>
      <p class="signup-link">
      Already have account?
      <label @click="() => $router.push('/login')">login</label>
    </p>
    </div>
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

<style>
.page {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.register-form {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 2rem;
  width: 80%;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
  0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>