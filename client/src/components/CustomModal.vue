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
    dialog: {
      type: Boolean,
    },
  },
};
</script>
