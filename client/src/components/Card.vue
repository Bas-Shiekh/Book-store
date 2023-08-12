<template>
    <v-card class="mx-auto card" @click="() => this.$router.push(`dashboard/${this.book.id}`)">
    <v-img v-bind:src="book.cover_image" height="200px" />
    <v-card-title> {{ book.title }} </v-card-title>
    <v-card-subtitle>
      {{ book.title.split(" ").slice(0, 6).join(" ") }}...
    </v-card-subtitle>
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
  data(){
    return {
      dialog: false
    }
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
