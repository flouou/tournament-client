<template>
  <div>
    <div class="groups">
      <div style="display: flex">
        <div
          div
          class="card mr-2"
          style="width: 18rem"
          v-for="group in groups"
          :key="group.id"
        >
          <div class="card-body">
            <h5 class="card-title">{{ group.name }}</h5>
            <p class="card-text">{{ group.club.name}}</p>
            <p class="card-text">{{ classificationName(group) }}</p>
            <a href="#" class="btn btn-primary">Bearbeiten</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GroupService from '@/services/group.service';

export default {
  name: 'Groups',
  data() {
    return {
      groups: [],
    };
  },
  async mounted() {
    const { data } = await GroupService.getAllGroups();
    this.groups = data;
  },
  methods: {
    classificationName(group) {
      return group.classification === null ? '' : group.classification.name;
    },
  },
};
</script>

<style scoped>
</style>
