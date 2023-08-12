<template>
  <v-container dark>
    <v-row>
      <v-col
        ><h2>Books / {{ book.title }}</h2></v-col
      >
    </v-row>
    <edit-book-form-app v-if="isEdit === true"
      :title="book.title"
      :publication_year="book.publication_year"
      :cover_image="book.cover_image"
      :category="book.category"
      :price="book.price"
      :author="book.author"
      :description="book.description"
    />
    <v-row v-if="isEdit === false">
      <section class="detail-container">
        <div class="image">
          <img v-bind:src="book.cover_image" v-bind:alt="book.title" />
        </div>
        <div class="details">
          <div>
            <h1>{{ book.title }}</h1>
            <h3>Published: <p>{{ book.publication_year }}</p></h3>
            <h3>
              Category: <v-chip outlined color="green">
                {{ book.category }}
              </v-chip>
            </h3>
            <h3>Price: <p>{{ book.price }}$</p></h3>
            <h3>Author:  <p>{{ book.author }}</p></h3>
            <div class="description">
              <h3>Description:</h3>
              <p>{{ book.description }}</p>
            </div>
          </div>
          <div class="book-actions">
            <v-btn color="primary" outlined @click="() => isEdit = true">Edit</v-btn>
            <v-btn color="red" outlined @click="toggleDialog(true)">Delete</v-btn>
          </div>
        </div>
      </section>
    </v-row>
    <confirm-delete-modal-app :dialog="dialog" :toggleDialog="toggleDialog" :submitFunction="deleteBook"/>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import ConfirmDeleteModal from '@/components/DeleteModal.vue'
import EditBookForm from '@/components/Forms/EditBookForm.vue'

interface Book {
  id: number;
  user_id: number;
  title: string;
  description: string;
  price: number;
  cover_image: string;
  publication_year: string;
  author: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export default Vue.extend({
  name: "bookDetails",
  components: {
    "confirm-delete-modal-app": ConfirmDeleteModal,
    "edit-book-form-app": EditBookForm
  },
  data() {
    return {
      book: {} as Book,
      bookId: this.$route.params.id,
      dialog: false,
      isEdit: false
    };
  },
  methods: {
    async getBookDetails() {
      try {
        const { data } = await Vue.axios.get(`/books/${this.bookId}`);
        this.book = data.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(error.response.data.message);
      }
    },
    async deleteBook() {
      try {
        const { data } = await Vue.axios.delete(`/books/${this.bookId}`)
        this.$notify({
          title: "Success",
          text: data.message,
          type: "success",
        });
        this.$store.commit("removeBookById", this.bookId)
        this.$router.push("/dashboard")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        this.$notify({
          title: "Error!",
          text: error.response.data.message,
          type: "error",
        });
      }
    },
    toggleDialog(isOpen: boolean) {
      this.dialog = isOpen
    }
  },
  mounted() {
    this.getBookDetails();
  },
});
</script>

<style>
.detail-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 70vh;
  overflow: hidden;
  border-radius: 10px;
  border: #e0e0e0 2px solid;
}
.image {
  width: 45%;
  height: 100%;
}
.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.details {
  display: flex;
  flex-direction: column;
  width: 50%;
  justify-content: space-between;
  padding: 0.5rem 0;
}
.details > div {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.details h1 {
  font-size: 2.2rem;
}
.details h3 {
  font-size: 1rem;
  color: #222222;
  display: flex;
  gap: 0.4rem;
  align-items: center;
}
.details h3 p {
  font-weight: normal;
  color: #444444;
  margin: 0;
}

.details .description {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.details .description p {
  color: #444444;
}
.book-actions {
  display: flex;
  align-items: center;
  flex-direction: row !important;
  gap: 1rem;
}
</style>
