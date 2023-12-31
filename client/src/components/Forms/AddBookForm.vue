<template>
  <custom-form-app :customFunction="submit" ref="formRef" class="form">
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="12">
            <v-text-field
              v-model="payload.title"
              :rules="validation.titleRules"
              :error-messages="errors.title"
              label="Book Title"
              outlined
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="payload.author"
              label="Author (Optional)"
              outlined
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              v-model="payload.publicationYear"
              label="Publication Year (Optional)"
              outlined
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-text-field
              :rules="validation.priceRules"
              :error-messages="errors.price"
              v-model="payload.price"
              label="Price"
              type="number"
              outlined
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-select
              v-model="payload.category"
              :items="['fiction', 'romance', 'novel', 'mystery', 'autobiography', 'biography', 'children']"
              label="Category (Optional)"
              outlined
              clearable
              required
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="12">
            <v-file-input
              @change="uploadFile"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              label="Book Cover (Optional)"
              outlined
            />
          </v-col>
          <v-col cols="12">
            <v-textarea
              :rules="validation.descriptionRules"
              :error-messages="errors.description"
              v-model="payload.description"
              label="Book Description"
              outlined
            ></v-textarea>
          </v-col>
          <v-btn type="submit" color="primary" class="submit">Submit</v-btn>
        </v-row>
      </v-container>
    </v-card-text>
  </custom-form-app>
</template>

<script>
import Vue from "vue";
import CustomForm from "./CustomForm.vue";

export default {
  props: {
    toggleDialog: {
      type: Function,
    },
    dialog: {
      type: Boolean,
    },
  },
  components: {
    "custom-form-app": CustomForm,
  },
  data: () => ({
    payload: {
      title: null,
      description: null,
      price: null,
      publicationYear: null,
      author: null,
      category: null,
      image: null,
    },
    validation: {
      titleRules: [(v) => !!v || "Title is required"],
      descriptionRules: [(v) => !!v || "Description is required"],
      priceRules: [(v) => !!v || "Price is required"],
    },
    errors: {},
  }),

  methods: {
    async submit() {
      this.clearErrors();
      if (this.$refs.formRef.$refs.form.validate()) {
        try {
          const { data } = await Vue.axios.post("/books", this.payload);
          console.log(data)
          this.$notify({
            title: "Success",
            text: data.message,
            type: "success",
            ignoreDuplicates: true,
          });
          this.$store.commit("addBook", data.data);
          this.clearPayload();
          this.$router.push("/dashboard")
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
    uploadFile(image) {
      if (!image) {
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        const base64File = reader.result.split(",")[1];
        this.payload.image = base64File;
      };
    },
    clearErrors() {
      this.errors = {};
    },
    clearPayload() {
      this.payload = {
        title: null,
        description: null,
        price: null,
        publicationYear: null,
        author: null,
        category: null,
        image: null,
      };
    },
  },
};
</script>
<style>
.form {
  border: #eeeeee 1px solid;
  border-radius: 30px;
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
</style>
