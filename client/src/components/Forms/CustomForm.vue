<template>
  <div>
    <v-form ref="form" @submit.prevent="handleSubmit">
      <slot></slot>
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
