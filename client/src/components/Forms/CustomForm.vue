<template>
  <div>
    <v-form ref="form" @submit.prevent="handleSubmit">
      <slot></slot>
      <v-btn type="submit" color="primary">Submit</v-btn>
    </v-form>
    <notifications position="top right" width="400px" classes="notification" />
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
      this.customFunction()
    },
  },
};
</script>
