/* eslint-disable vue/no-use-v-if-with-v-for */
<template>
  <div class="schedule">
    <div class="text-right">
      <button type="button"
              class="btn btn-primary ml-2 mb-2"
              @click="filterTable('')">
                All
      </button>
      <button type="button"
              class="btn btn-primary ml-2 mb-2"
              v-for="classification in classifications"
              :key="classification.id"
              @click="filterTable(classification.id)">
                {{classification.name}}
      </button>
    </div>
    <table class="table table-sm">
      <thead>
        <tr>
          <th scope="col">Time</th>
          <th scope="col">Group</th>
          <th scope="col">Club</th>
          <th scope="col">Category</th>
          <th scope="col">Rating</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="group in sortedGroups" :key="group.id">
          <th scope="row">{{group.time}}</th>
          <td>{{group.name}}</td>
          <td>{{group.club.name}}</td>
          <td>{{group.classification.name}}</td>
          <td>{{ formatRating(group.showRating) }}</td>
          <td><button type="button"
              class="btn btn-success ml-2 mb-2"
              @click="editEntry(group.id)">
                Edit
      </button></td>
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
      filter: '',
    };
  },
  async mounted() {
    const response = await fetch('http://localhost:8080/groups');
    this.groups = await response.json();
  },
  computed: {
    sortedGroups() {
      let sortedGroups = [...this.groups].sort((a, b) => a.time > b.time);
      sortedGroups = sortedGroups.filter((group) => group.classification.id === this.filter || this.filter === '');
      return sortedGroups;
    },
    classifications() {
      let classes = [];
      this.groups.forEach((group) => {
        if (group.classification != null
            && group.classification !== undefined
            && group.classification.id !== undefined) {
          classes[group.classification.id] = group.classification;
        }
      });
      classes = classes.filter((classification) => classification !== undefined);
      return classes;
    },
  },
  methods: {
    filterTable(classId) {
      this.filter = classId;
    },
    formatRating(showRating) {
      if (showRating !== null) {
        let sum = 0;
        showRating.ratings.forEach((rating) => {
          sum += rating.value;
        });
        return sum;
      }
      return '';
    },
  },
};
</script>

<style scoped>
</style>
