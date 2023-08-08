<template>
  <v-form ref="form" @submit.prevent="submit">
    <v-stepper v-model="e1">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          Email & password
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2">
          Profile
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items>
        <v-stepper-content step="1">
          <v-form ref="emailForm" @submit.prevent="submit">
            <v-text-field
              v-model="payload.email"
              label="Email"
              :rules="validation.emailRules"
              :error-messages="errors.email"
              required
              clearable
            />
            <v-text-field
              v-model="payload.password"
              label="Password"
              :rules="validation.passwordRules"
              :error-messages="errors.password"
              :type="showPassword ? 'text' : 'password'"
              required
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              @input="setPassword($event)" 
              clearable
            />
            <v-text-field
              v-model="payload.confirmPassword"
              label="Confirm Password"
              :rules="validation.confirmPasswordRules"
              :error-messages="errors.confirmPassword"
              :type="showPassword ? 'text' : 'password'"
              required
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
              clearable
            />
          </v-form>
          <v-btn color="primary" @click="stepping"> Next </v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-text-field
          v-model="payload.firstName"
            label="First Name"
            :rules="validation.firstNameRules"
            :error-messages="errors.firstName"
            required
          />
          <v-text-field
            v-model="payload.lastName"
            label="Last Name"
            :rules="validation.lastNameRules"
            :error-messages="errors.email"
            required
          />
          <v-file-input
            :rules="validation.imageRules"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Pick an avatar"
            prepend-icon="mdi-camera"
            label="Avatar"
          />
          <v-btn color="primary" @click="e1 = 1"> forward </v-btn>
          <v-btn type="submit" color="primary">Register</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-form >
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "RegisterForm",
  data() {
    return ({
      valid: false,
      e1: 1,
      payload: {
        email: null,
        password: null,
        confirmPassword: null,
        firstName: null,
        lastName: null
      },
      validation: {
        firstNameRules: [(v) => !!v || "First Name is required"],
        lastNameRules: [(v) => !!v || "Last Name is required"],
        emailRules: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+/.test(v) || "E-mail must be valid",
        ],
        passwordRules: [(v) => !!v || "password is required"],
        confirmPasswordRules: [
          (v) => !!v || "confirm password is required",
          (v) => v === this.payload.password || "Passwords do not match",
        ],
        imageRules: [
          (value) =>
            !value ||
            value.size < 2000000 ||
            "Avatar size should be less than 2 MB!",
        ],
      },
      showPassword: false,
      errors: {},
    })
  },

  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          console.log(this)
          const { data } = await Vue.axios.post("/auth/register", this.payload);
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
    setPassword(value) {
      this.payload.password = value;
    },
    stepping() {
      if (this.$refs.emailForm.validate()) {
        this.e1++
      }
    }
  },
});
</script>