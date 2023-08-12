<template>
  <v-container dark>
    <v-row>
      <v-col
        ><h2>Books / add</h2></v-col
      >
    </v-row>
    <v-row>
      <add-book-form-app />
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import AddBookForm from '@/components/Forms/AddBookForm.vue'

export default Vue.extend({
  name: "bookDetails",
  components: {
    "add-book-form-app": AddBookForm
  },
});
</script>
