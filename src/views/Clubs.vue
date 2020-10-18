<template>
  <div class="clubs-container">
    <validation-observer v-slot="{ invalid }">
      <b-form class="club-form mb-4">
        <b-form-group label="Name" label-for="nameInput" description="Please enter the club name.">
          <validation-provider rules="required" v-slot="{ errors }">
          <b-form-input
            type="text"
            class="form-control"
            id="nameInput"
            v-model="clubName"
          />
          <small>{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
        <b-form-group label="City" label-for="cityInput" description="Please enter the club's city">
          <validation-provider rules="required" v-slot="{ errors }">
          <b-form-input
            type="text"
            class="form-control"
            id="cityInput"
            v-model="clubCity"
          />
          <small>{{ errors[0] }}</small>
          </validation-provider>
        </b-form-group>
        <b-button
          variant="success"
          type="submit"
          @click.prevent="createClub"
          :disabled="invalid">Create Club</b-button>
      </b-form>
    </validation-observer>
    <div class="clubs">
      <b-card
        :title="club.name"
        class="mr-2 mb-2"
        style="width: 18rem;"
        v-for="club in clubs"
        :key="club.id">
        <b-card-text>
          {{club.city}}
        </b-card-text>
        <b-button
          variant="primary"
          :to="{ name: 'GroupDetails', params: { id: club.id }}">
          Details
        </b-button>
        <b-button
          @click.prevent="displayDeleteModal(club.id)"
          variant="danger"
          class="float-right">
          Delete
        </b-button>
      </b-card>
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
        this.clubCity = '';
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
