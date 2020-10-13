<template>
<div class="clubs-container">
  <form class="club-form mb-4">
      <div class="form-group">
        <label for="nameInput">Name</label>
        <input
          type="text"
          class="form-control"
          id="nameInput"
          aria-describedby="nameHelp"
          v-model="clubName"
        />
        <small id="nameHelp" class="form-text text-muted">
          Please enter the club name.
        </small>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">City</label>
        <input
          type="text"
          class="form-control"
          id="cityInput"
          aria-describedby="cityHelp"
          v-model="clubCity"
        />
        <small id="cityHelp" class="form-text text-muted">
          Please enter the club's city.
        </small>
      </div>
      <button type="submit" @click.prevent="createClub" class="btn btn-success">Create Club</button>
    </form>
    <div class="clubs">
    <div style="display:flex">
      <div div class="card mr-2" style="width: 18rem;" v-for="club in clubs" :key="club.id">
        <div class="card-body">
          <h5 class="card-title">{{club.name}}</h5>
          <p class="card-text">{{club.city}}</p>
          <button @click.prevent="toggleCreateGroupForm(club.id)" class="btn btn-primary">
            New Group
          </button>
          <button @click.prevent="deleteClub(club.id)" class="btn btn-danger float-right">
            Delete
          </button>
          <form class="add-group-to-club-form mt-2" v-if="club.id === createGroupClubId">
            <hr>
            <label for="nameInput">Name</label>
            <input
              type="text"
              class="form-control"
              id="nameInput"
              v-model="createGroupName"
            />
            <label for="nameInput">Kategorie</label>
            <input
              type="text"
              class="form-control"
              id="nameInput"
              v-model="createGroupClass"
            />
            <button type="submit" @click.prevent="createGroup" class="btn btn-success mt-2">
              Create Group
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import GroupService from '@/services/group.service';
import ClubService from '@/services/club.service';

export default {
  name: 'Clubs',
  data() {
    return {
      clubs: [],
      clubName: '',
      clubCity: '',
      createGroupName: '',
      createGroupClass: '',
      createGroupClubId: '',
    };
  },
  async mounted() {
    try {
      const response = await ClubService.getAllClubs();
      this.clubs = await response.data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async createClub() {
      const createResponse = await ClubService.createClub(this.clubName, this.clubCity);
      console.log(createResponse);
      if (createResponse.status === 201) {
        const { data } = await ClubService.getAllClubs();
        this.clubs = data;
      }
    },
    async createGroup() {
      await GroupService
        .createGroup(this.createGroupName, this.createGroupClass, this.createGroupClubId);
      this.toggleCreateGroupForm(this.createGroupClubId);
    },
    async deleteClub(id) {
      const deleteResponse = await ClubService.deleteClub(id);
      if (deleteResponse.status === 200) {
        const { data } = await ClubService.getAllClubs();
        this.clubs = data;
      }
    },
    toggleCreateGroupForm(id) {
      this.createGroupClubId = this.createGroupClubId !== id ? id : '';
      this.createGroupName = '';
      this.createGroupClass = '';
    },
  },
};
</script>

<style scoped>
</style>
