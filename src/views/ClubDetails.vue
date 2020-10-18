<template>
  <div>
    <h1>{{club.name}}</h1>
    <h3>{{club.city}}</h3>
    <b-button variant="primary" class="my-4" @click="toggleCreateGroupForm">
      {{showCreateGroupForm ? 'Hide' : 'New Group'}}
    </b-button>
    <validation-observer  v-slot="{ invalid }">
      <b-form class="club-form mb-4" v-if="showCreateGroupForm">
        <b-form-group
          label="Group name"
          label-for="nameInput"
          description="Please enter the group name.">
          <validation-provider rules="required" v-slot="{ errors }">
          <b-form-input
            id="nameInput"
            aria-describedby="nameHelp"
            v-model="newGroupName"
          />
          <small>{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
        <b-form-group
          label="Category"
          label-for="classInput"
          description="Please enter the group's category.">
          <validation-provider rules="required" v-slot="{ errors }">
          <b-form-select
            class="form-control"
            id="classInput"
            v-model="newGroupClass"
            :options="formatClassOptions()">
          </b-form-select>
          <small>{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
        <button
          type="submit"
          @click.prevent="createGroup"
          class="btn btn-success"
          :disabled="invalid">
          Create Group
        </button>
      </b-form>
    </validation-observer>
    <b-list-group>
      <b-list-group-item v-for="group in groups" :key="group.id">
        <b-row>
          <b-col cols="4">
            {{group.name}}
          </b-col>
          <b-col cols="4" class="text-center">
            {{displayClassification(group.classification)}}
          </b-col>
          <b-col cols="2" class="text-right">
            <span class="single-ratings mr-2">{{displaySingleRatings(group.showRating)}}</span>
          </b-col>
          <b-col cols="2" class="text-right">
            <span class="final-rating text-primary">{{displayRating(group.showRating)}}</span>
          </b-col>
        </b-row>
      </b-list-group-item>
    </b-list-group>
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
    formatClassOptions() {
      const options = [];
      this.classifications.forEach((classification) => {
        const option = {};
        option.value = classification.id;
        option.text = classification.name;
        options.push(option);
      });
      return options;
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
