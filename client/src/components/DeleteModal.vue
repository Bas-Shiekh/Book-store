<template>
  <custom-modal-app :dialog="dialog">
      <v-card>
        <v-card-title class="text-h5">
          Do you want to delete book?
        </v-card-title>
        <v-card-text
          >Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" outlined @click="toggleDialog(false)"> Disagree </v-btn>
          <v-btn color="red" outlined @click="submitFunction"> Agree </v-btn>
        </v-card-actions>
      </v-card>
  </custom-modal-app>
</template>

<script>
import CustomModal from '@/components/CustomModal.vue';

export default {
  components: {
    "custom-modal-app": CustomModal
  },
  props: {
    submitFunction: {
      type: Function
    },
    toggleDialog: {
      type: Function
    },
    dialog: {
      type: Boolean
    }
  },
};
</script>
