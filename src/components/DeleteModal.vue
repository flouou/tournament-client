<template>
  <div class="modal" tabindex="-1" id="deleteModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ deleteTitle }}</h5>
        </div>
        <div class="modal-body">
          <p>{{ deleteMessage }}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            @click="closeDialog">Close</button>
          <button
            type="button"
            class="btn btn-primary"
            @click="confirmDelete">Confirm</button>
        </div>
      </div>
    </div>
  </div>
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
    document.querySelector('#deleteModal').style.display = 'block';
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
