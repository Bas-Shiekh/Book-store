<template>
  <custom-form-app :customFunction="submit" ref="formRef">
    <v-text-field
      v-model="email"
      label="Email"
      :rules="validation.emailRules"
      :error-messages="errors.email"
      required
      clearable
      outlined
      class="input"
    />
    <v-text-field
      v-model="password"
      label="Password"
      :rules="validation.passwordRules"
      :error-messages="errors.password"
      :type="showPassword ? 'text' : 'password'"
      required
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      @click:append="showPassword = !showPassword"
      clearable
      outlined
      class="input"
    />
    <v-btn type="submit" color="primary" class="submit">Submit</v-btn>
    <p class="signup-link">
      No account?
      <label @click="() => $router.push('/register')">Sign up</label>
    </p>
  </custom-form-app>
</template>

<script>
import Vue from "vue";
import CustomForm from "./CustomForm.vue";
export default Vue.extend({
  name: "LoginForm",
  components: {
    "custom-form-app": CustomForm,
  },
  data: () => ({
    valid: false,
    email: "",
    password: "",
    validation: {
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [(v) => !!v || "password is required"],
    },
    showPassword: false,
    errors: {},
  }),

  methods: {
    async submit() {
      this.clearErrors();
      if (this.$refs.formRef.$refs.form.validate()) {
        try {
          const response = await Vue.axios.post("/auth/login", {
            email: this.email,
            password: this.password,
          });
          this.$store.commit("setUser", response.data.data);
          this.$notify({
            title: "Success",
            text: response.data.message,
            type: "success",
            ignoreDuplicates: true,
          });
          this.$router.push("/dashboard");
        } catch (error) {
          this.$notify({
            title: "Error!",
            text: error.response.data.message,
            type: "error",
            ignoreDuplicates: true,
          });
        }
      }
    },
    clearErrors() {
      this.errors = {};
    },
  },
});
</script>

<style>
.input {
  width: 300px;
}
.form-title {
  font-size: 1.25rem;
  font-weight: 600;
  text-align: center;
  color: #000;
  margin-bottom: 2rem !important;
}
.submit {
  display: block;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  background-color: #4f46e5;
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  width: 100%;
  border-radius: 0.5rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
}
.signup-link {
  color: #6b7280;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: center;
}
.signup-link label {
  cursor: pointer;
  text-decoration: underline;
}
</style>
