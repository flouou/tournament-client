<template>
  <div class="groups">
    <div style="display:flex">
      <div div class="card mr-2" style="width: 18rem;" v-for="group in groups" :key="group.id">
        <div class="card-body">
          <h5 class="card-title">{{group.name}}</h5>
          <p class="card-text">{{group.club.name}}</p>
          <p class="card-text">{{group.classification.name}}</p>
          <a href="#" class="btn btn-primary">Bearbeiten</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Groups',
  data() {
    return {
      groups: [],
    };
  },
  async mounted() {
    const response = await fetch('http://localhost:8080/groups');
    this.groups = await response.json();
  },
};
</script>

<style scoped>
</style>
