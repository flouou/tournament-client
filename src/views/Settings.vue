<template>
  <div class="container">
    <h1>Settings</h1>
    <b-form class="mt-4">
      <b-row>
        <b-col md="6" class="form-group col-md-6">
          <b-form-group label="Number of Jurors" label-for="inputNumberJury">
            <b-input
            type="number"
            class="form-control"
            id="inputNumberJury"
            @blur="setNumberJurors"
            v-model="settings.jurorCount"/>
          </b-form-group>
        </b-col>
      </b-row>
      <h3>Categories</h3>
      <b-row>
        <b-col md="4">
          <b-form-group label="Name" label-for="inputClassificationName">
            <b-form-input
            class="form-control"
            id="inputClassificationName"
            v-model="newClassificationName"/>
          </b-form-group>
        </b-col>
        <b-col md="4">
          <b-form-group label="Description" label-for="inputClassificationDescription">
            <b-form-input
              type="text"
              class="form-control"
              id="inputClassificationDescription"
              v-model="newClassificationDescription"/>
          </b-form-group>
        </b-col>
        <b-col md="2" class="d-flex align-items-end" style="justify-content: center;">
          <b-form-group>
            <font-awesome-icon
              icon="plus"
              class="check-icon text-primary"
              @click="addClassification()"/>
          </b-form-group>
        </b-col>
      </b-row>
      <b-list-group>
        <b-list-group-item
          v-for="classification in classifications"
          :key="classification.id">
          <b-row>
            <b-col cols="6">
              {{classification.name}}
            </b-col>
            <b-col cols="6" class="text-center">
              {{classification.name}}
            </b-col>
          </b-row>
        </b-list-group-item>
      </b-list-group>
    </b-form>
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
