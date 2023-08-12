import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

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

export default new Vuex.Store({
  state: {
    books: [] as Book[],
    user: null,
  },
  getters: {},
  mutations: {
    setBooks(state, books) {
      state.books = books;
    },
    setUser(state, user) {
      state.user = user;
    },
    removeBookById(state, bookId) {
      state.books = state.books.filter((book) => book.id !== bookId);
    },
    addBook(state, book) {
      state.books = [...state.books, book];
    },
    editBookById(state, editedBook) {
      const bookIndex = state.books.findIndex((book) => book.id === editedBook.id)
      state.books[bookIndex] = editedBook
    },
  },
  actions: {},
  modules: {},
});
