<template>
  <v-card
    class="mx-auto card"
    @click="() => this.$router.push(`dashboard/${this.book.id}`)"
  >
    <v-img v-bind:src="book.coverImage" height="200px" />
    <v-card-title> {{ book.title }} </v-card-title>
    <v-card-subtitle>
      {{ book.title.split(" ").slice(0, 6).join(" ") }}...
    </v-card-subtitle>
    <div class="details">
      <h3>Price: <p>{{ book.price }}$</p></h3>
      <h3>Author: <p>{{ book.author }}</p></h3>
      <h3>Publish Year: <p>{{ book.publicationYear }}</p></h3>
    </div>
    <v-chip outlined class="ma-2" color="green">
      {{ book.category }}
    </v-chip>
  </v-card>
</template>

<script>
export default {
  props: {
    book: {
      type: Object,
    },
  },
  data() {
    return {
      dialog: false,
    };
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
.details {
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  gap: 0.5rem;
}
.details .h3 {
  font-size: 0.9rem;
  color: #444444;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.details .h3 .p{
  font-size: 0.9rem;
  color: #666666;
  margin: 0;
}
</style>
