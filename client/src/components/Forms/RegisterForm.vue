<template>
  <v-form ref="form" @submit.prevent="submit" class="signup-form">
    <v-stepper v-model="e1" class="stepper">
      <v-stepper-header class="stepper-header">
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
              outlined
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
              outlined
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
              outlined
            />
          </v-form>
          <v-btn color="primary" @click="stepping" class="submit"> Next </v-btn>
        </v-stepper-content>
        <v-stepper-content step="2">
          <v-text-field
            v-model="payload.firstName"
            label="First Name"
            :rules="validation.firstNameRules"
            :error-messages="errors.firstName"
            required
            outlined
          />
          <v-text-field
            v-model="payload.lastName"
            label="Last Name"
            :rules="validation.lastNameRules"
            :error-messages="errors.email"
            required
            outlined
          />
          <v-file-input
            @change="uploadFile"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Pick an avatar"
            prepend-icon="mdi-camera"
            label="Avatar"
            outlined
          />
          <v-card-actions class="actions">
            <v-btn color="primary" @click="e1 = 1" outlined class="forward"> forward </v-btn>
            <v-btn type="submit" color="primary" class="submit">Register</v-btn>
          </v-card-actions>
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
        lastName: null,
        image: null
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
      },
      showPassword: false,
      errors: {},
    })
  },

  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        try {
          const { data } = await Vue.axios.post("/auth/register", this.payload);
          this.$store.commit("setUser", data.data)
          this.$notify({
            title: "Success",
            text: data.message,
            type: "success",
            ignoreDuplicates: true,
          });
          this.$router.push('/dashboard');
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
    },
    uploadFile(image) {
      if (!image) {
        return;
      }
      // Convert the selected file to Base64
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        const base64File = reader.result.split(',')[1];
        this.payload.image = base64File
      };
    },
  },
});
</script>

<style>
.stepper-header {
  box-shadow: none;
  border: 2px solid #4f46e5;
  border-radius: 10px;
}
.stepper {
  box-shadow: none !important;
}
.actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.actions .forward {
  width: 50%;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  text-transform: uppercase;
  margin: 0;
}
.actions .submit {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  background-color: #4f46e5;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 500;
  width: 50% !important;
  border-radius: 0.5rem;
  text-transform: uppercase;
  margin: 0;
}
</style>
