<template>
  <div class="container">
    <h1>Settings</h1>
    <form class="mt-4">
      <div class="row">
        <div class="form-group col-md-6">
          <label for="inputNumberJury">Number of Jurors</label>
          <input
            type="number"
            class="form-control"
            id="inputNumberJury"
            @blur="setNumberJurors"
            v-model="settings.jurorCount">
        </div>
      </div>
      <h3>Classifications</h3>
      <div class="row">
        <div class="form-group col-md-4">
          <label for="inputNumberJury">Name</label>
          <input
            type="text"
            class="form-control"
            id="inputClassificationName"
            v-model="newClassificationName">
        </div>
        <div class="form-group col-md-4">
          <label for="inputNumberJury">Description</label>
          <input
            type="text"
            class="form-control"
            id="inputClassificationDescription"
            v-model="newClassificationDescription">
        </div>
        <div class="form-group col-md-2 d-flex align-items-end">
          <font-awesome-icon
            icon="plus"
            class="check-icon text-primary"
            @click="addClassification()"/>
        </div>
      </div>
      <ul class="list-group">
        <li
          class="list-group-item"
          v-for="classification in classifications"
          :key="classification.id">
          <div class="row">
            <div class="col-6">
              {{classification.name}}
            </div>
            <div class="col-6 text-center">
              {{classification.name}}
            </div>
          </div>
        </li>
      </ul>
    </form>
  </div>
</template>

<script>
import SettingService from '@/services/setting.service';
import ClassificationService from '@/services/classification.service';

export default {
  name: 'Settings',
  data() {
    return {
      settings: {},
      classifications: [],
      newClassificationName: '',
      newClassificationDescription: '',
    };
  },
  async mounted() {
    this.settings = SettingService.getAllSettings();
    const classificationResponse = await ClassificationService.getAllClassifications();
    this.classifications = classificationResponse.data;
  },
  methods: {
    setNumberJurors() {
      SettingService.setJurorCount(this.settings.jurorCount);
    },
    async setClassifications() {
      const { data } = await ClassificationService.getAllClassifications();
      this.classifications = data;
    },
    async addClassification() {
      await ClassificationService.addClassification(
        this.newClassificationName,
        this.newClassificationDescription,
      );
      this.setClassifications();
    },
  },
};
</script>

<style scoped>
.check-icon{
  font-size: 2.25em;
  cursor: pointer;
}
</style>
