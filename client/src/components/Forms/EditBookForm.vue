<template>
  <v-card :style="{ background: $vuetify.theme.themes.dark.background }">
    <custom-form-app :customFunction="submit" ref="formRef">
      <v-card-title>
        <span class="text-h5">Add New Book</span>
      </v-card-title>
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
                :items="['action']"
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
          </v-row>
        </v-container>
      </v-card-text>
    </custom-form-app>
  </v-card>
</template>

<script>
import Vue from "vue";
import CustomForm from "./CustomForm.vue";

export default {
  components: {
    "custom-form-app": CustomForm,
  },
  props: [
    "title",
    "description",
    "publication_year",
    "price",
    "category",
    "cover_image",
    "author",
  ],
  data() {
    return {
      payload: {
        title: this.$props.title,
        description: this.$props.description,
        price: this.$props.price,
        publicationYear: this.$props.publication_year,
        author: this.$props.author,
        category: this.$props.category,
        image: this.$props.cover_image,
      },
      validation: {
        titleRules: [(v) => !!v || "Title is required"],
        descriptionRules: [(v) => !!v || "Description is required"],
        priceRules: [(v) => !!v || "Price is required"],
      },
      errors: {},
    }
  },

  methods: {
    async submit() {
      this.clearErrors();
      if (this.$refs.formRef.$refs.form.validate()) {
        try {
          const { data } = await Vue.axios.put(
            `/books/${this.$route.params.id}`,
            this.payload
          );
          console.log(data)
          this.$notify({
            title: "Success",
            text: data.message,
            type: "success",
            ignoreDuplicates: true,
          });
          this.$store.commit("editBookById", data.data);
          this.clearPayload();
        } catch (error) {
          console.log(error)
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