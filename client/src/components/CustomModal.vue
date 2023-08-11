<template>
  <v-row justify="center">
    <v-dialog v-model="$props.dialog" persistent max-width="800px">
      <slot></slot>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    toggleDialog: {
      type: Function,
    },
    dialog: {
      type: Boolean,
    },
  },
  methods: {
    handleSubmit() {
      this.customFunction();
    },
  },
};
</script>
