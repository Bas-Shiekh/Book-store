<template>
  <custom-form-app :customFunction="submit" ref="formRef">
    <v-card-text>
      <v-text-field
        v-model="email"
        label="Email"
        :rules="validation.emailRules"
        :error-messages="errors.email"
        required
        clearable
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
      />
    </v-card-text>
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
          const { data } = await Vue.axios.post("/auth/login", {
            email: this.email,
            password: this.password,
          });
          this.$notify({
            title: "Success",
            text: data.message,
            type: "success",
            ignoreDuplicates: true,
          });
          // this.$router.push('book');
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
