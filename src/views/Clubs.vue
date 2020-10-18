<template>
  <div class="clubs-container">
    <validation-observer v-slot="{ invalid }">
      <form class="club-form mb-4">
        <div class="form-group">
          <label for="nameInput">Name</label>
          <validation-provider rules="required" v-slot="{ errors }">
          <input
            type="text"
            class="form-control"
            id="nameInput"
            aria-describedby="nameHelp"
            v-model="clubName"
          />
          <small>{{ errors[0] }}</small>
          </validation-provider>
          <small id="nameHelp" class="form-text text-muted">
            Please enter the club name.
          </small>
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">City</label>
          <validation-provider rules="required" v-slot="{ errors }">
          <input
            type="text"
            class="form-control"
            id="cityInput"
            aria-describedby="cityHelp"
            v-model="clubCity"
          />
          <small>{{ errors[0] }}</small>
          </validation-provider>
          <small id="cityHelp" class="form-text text-muted">
            Please enter the club's city.
          </small>
        </div>
        <button
          type="submit"
          @click.prevent="createClub"
          class="btn btn-success" :disabled="invalid">Create Club</button>
      </form>
    </validation-observer>
    <div class="clubs">
      <div div class="card mr-2 mb-2" style="width: 18rem;" v-for="club in clubs" :key="club.id">
        <div class="card-body">
          <h5 class="card-title">{{club.name}}</h5>
          <p class="card-text">{{club.city}}</p>
          <router-link
            class="btn btn-primary"
            :to="{ name: 'GroupDetails', params: { id: club.id }}">
            Details
          </router-link>
          <button @click.prevent="displayDeleteModal(club.id)" class="btn btn-danger float-right">
            Delete
          </button>
        </div>
      </div>
    </div>
    <delete-modal
      :deleteTitle="deleteTitle"
      :deleteMessage="deleteMessage"
      @deleteRecordEvent="deleteClub"
      @closeDeleteDialog="closeDialog"
      v-if="deleteModal"/>
  </div>
</template>

<script>
import ClubService from '@/services/club.service';
import DeleteModal from '@/components/DeleteModal.vue';

export default {
  name: 'Clubs',
  components: {
    'delete-modal': DeleteModal,
  },
  data() {
    return {
      clubs: [],
      clubName: '',
      clubCity: '',
      deleteTitle: '',
      deleteMessage: '',
      deleteClubId: '',
      deleteModal: false,
    };
  },
  async mounted() {
    try {
      const { data } = await ClubService.getAllClubs();
      this.clubs = data;
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    async createClub() {
      const { status } = await ClubService.createClub(this.clubName, this.clubCity);
      if (status === 201) {
        const { data } = await ClubService.getAllClubs();
        this.clubs = data;
        this.clubName = '';
        this.ClubCity = '';
      }
    },
    displayDeleteModal(id) {
      this.deleteClubId = id;
      this.deleteTitle = 'Are you sure?';
      this.deleteMessage = 'Do you really want to delete this Club? Please confirm!';
      this.deleteModal = true;
    },
    closeDialog() {
      this.deleteClubId = '';
      this.deleteTitle = '';
      this.deleteMessage = '';
      this.deleteModal = false;
    },
    async deleteClub() {
      const { status } = await ClubService.deleteClub(this.deleteClubId);
      if (status === 200) {
        const { data } = await ClubService.getAllClubs();
        this.closeDialog();
        this.clubs = data;
      }
    },
  },
};
</script>

<style scoped>
.clubs{
  display:flex;
  flex-wrap:wrap
}
</style>
