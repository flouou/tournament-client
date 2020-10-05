<template>
  <div class="schedule">
    <table class="table table-sm">
      <thead>
        <tr>
          <th scope="col">Time</th>
          <th scope="col">Group</th>
          <th scope="col">Club</th>
          <th scope="col">Category</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="group in sortedGroups" :key="group.id">
          <th scope="row">{{group.time}}</th>
          <td>{{group.name}}</td>
          <td>{{group.club.name}}</td>
          <td>{{group.classification.name}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

export default {
  name: 'Schedule',
  data() {
    return {
      groups: [],
    };
  },
  async mounted() {
    const response = await fetch('http://localhost:8080/groups');
    this.groups = await response.json();
  },
  computed: {
    sortedGroups() {
      return [...this.groups].sort((a, b) => a.time > b.time);
    },
  },
};
</script>

<style scoped>
</style>
