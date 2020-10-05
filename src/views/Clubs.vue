<template>
  <div class="clubs">
    <div style="display:flex">
      <div div class="card mr-2" style="width: 18rem;" v-for="club in clubs" :key="club.id">
        <div class="card-body">
          <h5 class="card-title">{{club.name}}</h5>
          <p class="card-text">{{club.city}}</p>
          <a href="#" class="btn btn-primary">Bearbeiten</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Clubs',
  data() {
    return {
      clubs: [],
    };
  },
  async mounted() {
    const response = await fetch('http://localhost:8080/clubs');
    this.clubs = await response.json();
  },
};
</script>

<style scoped>
</style>
