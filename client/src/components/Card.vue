<template>
  <v-card class="mx-auto card" dark color="#323850">
    <v-img v-bind:src="book.cover_image" height="200px" />
    <v-card-title> {{ book.title }} </v-card-title>
    <v-card-subtitle>
      {{ book.title.split(" ").slice(0, 6).join(" ") }}...
    </v-card-subtitle>
    <v-card-actions>
      <p>Price: ${{ book.price }}</p>
      <v-spacer />
      <v-chip outlined class="ma-2" color="green">
        {{ book.category }}
      </v-chip>
    </v-card-actions>
    <v-card-actions>
      <v-btn color="orange lighten-2" text @click="goTo"> Explore </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="performCustomAction" color="primary">
        <v-icon text="">mdi-pencil</v-icon>
      </v-btn>
      <v-btn icon @click="deleteBook(book.id)" color="red">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
      <div class="my-4 text-subtitle-1"></div>
    </v-card-actions>
  </v-card>
</template>

<script>
import Vue from 'vue'
import { mapState, mapMutations } from 'vuex';

export default {
  props: {
    book: {
      type: Object,
    },
  },
  data: () => ({}),
  methods: {
    goTo() {
      this.$router.push(`book/${this.book.id}`);
    },
    performCustomAction() {
      console.log('Custom action "chevron-up" clicked');
    },
    async deleteBook(id) {
      try {
        const { data } = await Vue.axios.delete(`/books/${id}`)
        this.$notify({
          title: "Success",
          text: data.message,
          type: "success",
          ignoreDuplicates: true,
        });
        this.$store.commit("removeBookById", id)
      } catch (error) {
        this.$notify({
          title: "Error!",
          text: error.response.data.message,
          type: "error",
          ignoreDuplicates: true,
        });
      }
    },
    ...mapMutations(['removeBookById'])
  },
  computed: {
    ...mapState(['books'])
  },
};
</script>

<style>
.card {
  border-radius: 5px;
  transition: all 0.2s ease-in-out;
}
.card:hover {
  transform: scale(1.1);
}
</style>
