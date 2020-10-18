<template>
  <b-modal
    id="deleteModal"
    :title="deleteTitle"
    @ok="confirmDelete"
    @cancel="closeDialog">
    <p>{{ deleteMessage }}</p>
  </b-modal>
</template>

<script>
export default {
  name: 'deleteModal',
  props: {
    deleteMessage: {
      type: String,
      required: true,
    },
    deleteTitle: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.$bvModal.show('deleteModal');
  },
  methods: {
    confirmDelete() {
      this.$emit('deleteRecordEvent');
    },
    closeDialog() {
      this.$emit('closeDeleteDialog');
    },
  },
};
</script>

<style scoped>
</style>
