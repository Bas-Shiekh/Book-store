<template>
  <v-container dark>
    <v-row>
      <v-col><h3>Books</h3></v-col>
      <v-btn @click="() => $router.push('dashboard/add')" color="primary">Add Book</v-btn>
    </v-row>
    <v-row>
      <v-col cols="12" md="4">
        <v-text-field
          v-model="searchText"
          label="Search"
          outlined
          @input="handleInput"
        ></v-text-field>
      </v-col>
      <v-col>
        <v-select
          v-model="selectedCategory"
          :items="categories"
          label="Category"
          outlined
          clearable
          @change="fetchBooks"
        ></v-select>
      </v-col>
      <v-col>
        <v-select
          v-model="selectedSort"
          :items="sortLabels"
          label="Sort by"
          outlined
          clearable
          @change="fetchBooks"
        ></v-select>
      </v-col>
      <v-col>
        <v-radio-group v-model="sortAs" mandatory @change="fetchBooks">
          <v-radio label="Ascending" value="asc"></v-radio>
          <v-radio label="Descending" value="desc"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <div class="card-container">
      <book-card-app v-for="book in $store.state.books" :key="book.id" :book="book"/>
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import BookCard from "@/components/Card.vue";

interface Book {
  id: number;
  user_id: number;
  title: string;
  description: string;
  price: number;
  coverImage: string;
  publicationYear: string;
  author: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export default Vue.extend({
  name: "book",
  components: {
    "book-card-app": BookCard,
  },
  data() {
    return {
      books: [] as Book[],
      searchText: "",
      selectedCategory: null,
      categories: ["Action"],
      selectedSort: null,
      sortLabels: ["Price", "Publication year", "Created at", "Updated at"],
      sorts: {
        Price: "price",
        "Publication year": "publication_year",
        "Created at": "createdAt",
        "Updated at": "updatedAt",
      },
      sortAs: "asc",
      debounceTimer: 0,
      dialog: false,
    };
  },
  methods: {
    handleInput() {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }
      this.debounceTimer = setTimeout(() => {
        this.fetchBooks();
      }, 300);
    },
    async fetchBooks() {
      try {
        const { data } = await Vue.axios.get(
          `/books?sort=${
            this.selectedSort !== null ? `${this.sorts[this.selectedSort]}` : ""
          }:${this.sortAs}${
            this.selectedCategory !== null
              ? `&category=${this.selectedCategory}`
              : ""
          }${this.searchText ? `&search=${this.searchText}` : ""}`
        );
        this.books = data.data;
        this.$store.commit("setBooks", data.data)
      } catch (error) {
        console.log(error);
      }
    },
    toggleDialog(isOpen: boolean) {
      this.dialog = isOpen
    },
  },
  async beforeMount() {
    try {
      const { data } = await Vue.axios.get("/books");
      console.log(data.data)
      this.$store.commit("setBooks", data.data)
      this.books = data.data;
    } catch (error) {
      console.log(error);
    }
  },
});
</script>

<style>
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}
</style>
