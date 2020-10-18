<template>
  <div>
    <h1>{{club.name}}</h1>
    <h3>{{club.city}}</h3>
    <button class="btn btn-primary my-4" @click="toggleCreateGroupForm">
      {{showCreateGroupForm ? 'Hide' : 'New Group'}}
    </button>
    <validation-observer  v-slot="{ invalid }">
      <form class="club-form mb-4" v-if="showCreateGroupForm">
        <div class="form-group">
          <label for="nameInput">Group name</label>
          <validation-provider rules="required" v-slot="{ errors }">
          <input
            type="text"
            class="form-control"
            id="nameInput"
            aria-describedby="nameHelp"
            v-model="newGroupName"
          />
          <small>{{ errors[0] }}</small>
          </validation-provider>
          <small id="nameHelp" class="form-text text-muted">
            Please enter the group name.
          </small>
        </div>
        <div class="form-group">
          <label for="classInput">Classification</label>
          <validation-provider rules="required" v-slot="{ errors }">
          <select
            class="form-control"
            id="classInput"
            aria-describedby="classHelp"
            v-model="newGroupClass">
            <option
              v-for="classification in classifications"
              :key="classification.id"
              :value="classification.id">
              {{classification.name}}
            </option>
          </select>
          <small>{{ errors[0] }}</small>
          </validation-provider>
          <small id="classHelp" class="form-text text-muted">
            Please enter the group's classification.
          </small>
        </div>
        <button
          type="submit"
          @click.prevent="createGroup"
          class="btn btn-success"
          :disabled="invalid">
          Create Group
        </button>
      </form>
    </validation-observer>
    <ul class="list-group">
      <li class="list-group-item" v-for="group in groups" :key="group.id">
        <div class="row">
          <div class="col-4">
            {{group.name}}
          </div>
          <div class="col-4 text-center">
            {{displayClassification(group.classification)}}
          </div>
          <div class="col-2 text-right">
            <span class="single-ratings mr-2">{{displaySingleRatings(group.showRating)}}</span>
          </div>
          <div class="col-2 text-right">
            <span class="final-rating text-primary">{{displayRating(group.showRating)}}</span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import ClubService from '@/services/club.service';
import GroupService from '@/services/group.service';
import ClassificationService from '@/services/classification.service';

export default {
  name: 'ClubDetails',
  data() {
    return {
      club: {},
      groups: [],
      classifications: [],
      newGroupName: '',
      newGroupClass: '',
      showCreateGroupForm: false,
    };
  },
  async mounted() {
    const clubs = await ClubService.getClub(this.$route.params.id);
    this.club = clubs.data;
    const groups = await ClubService.getGroupsForClub(this.$route.params.id);
    this.groups = groups.data;
    const classifications = await ClassificationService.getAllClassifications();
    this.classifications = classifications.data;
  },
  methods: {
    displayClassification(classification) {
      if (classification && classification.name) {
        return classification.name;
      }
      return '';
    },
    displayRating(showRating) {
      if (!showRating || !showRating.ratings) { return ''; }
      return showRating.ratings.reduce((acc, current) => acc + current.value, 0);
    },
    displaySingleRatings(showRating) {
      if (!showRating || !showRating.ratings) { return ''; }
      return showRating.ratings.reduce((acc, current) => `${acc}, ${current.value}`, '').slice(2, this.length);
    },
    async createGroup() {
      await GroupService.createGroup(this.newGroupName, this.newGroupClass, this.$route.params.id);
      this.newGroupName = '';
      this.newGroupClass = '';
      const { data } = await ClubService.getGroupsForClub(this.$route.params.id);
      this.groups = data;
      this.toggleCreateGroupForm();
    },
    toggleCreateGroupForm() {
      this.showCreateGroupForm = !this.showCreateGroupForm;
    },
  },
};
</script>

<style>
.final-rating{
  font-weight: bold;
  font-size: 1.25em;
}
</style>
