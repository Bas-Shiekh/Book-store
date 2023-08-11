<template>
  <div>
    <v-form ref="form" @submit.prevent="handleSubmit">
      <slot></slot>
      <v-btn type="submit" color="primary">Submit</v-btn>
    </v-form>
  </div>
</template>

<script>
import "../../../assets/main.css";

export default {
  props: {
    customFunction: {
      type: Function,
      required: true,
    },
  },
  methods: {
    handleSubmit() {
      this.customFunction();
    },
  },
};
</script>

<style></style>
