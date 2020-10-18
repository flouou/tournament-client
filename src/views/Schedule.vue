<template>
  <div class="schedule">
    <div class="text-right">
      <b-button :variant="filter === '' ? 'info' : 'primary'"
              class="ml-2 mb-2"
              @click="filterTable('')">
                All
      </b-button>
      <b-button :variant="filter === classification.id ? 'info' : 'primary'"
              class="ml-2 mb-2"
              v-for="classification in classifications"
              :key="classification.id"
              @click="filterTable(classification.id)">
                {{classification.name}}
      </b-button>
    </div>
    <b-pagination
      v-model="currentPage"
      :total-rows="rowCount"
      :per-page="perPage"
      aria-controls="schedule-table"
    ></b-pagination>
    <b-table
      id="schedule-table"
      :items="sortedGroups"
      :fields="fields"
      responsive
      :per-page="perPage"
      :current-page="currentPage">
      <template v-slot:cell(time)="group">
        <div @click="editTime(group.item.id)">
          <span v-if="showTimeInputId !== group.item.id">{{formatTime(group.item.time)}}</span>
          <div v-if="showTimeInputId === group.item.id">
            <b-input
              type="time"
              :value="formatTime(group.item.time)"
              :id="`time-input-${group.item.id}`"/>
            <font-awesome-icon
              class="check-icon ml-2"
              icon="check"
              @click.stop="updateTime(group.item.id)"/>
          </div>
        </div>
      </template>

      <template v-slot:cell(showRating)="group">
        <div @click="editRating(group.item.id)">
          <span v-if="showRatingInputId !== group.item.id">
            {{ formatRating(group.item.showRating) }}
          </span>
          <div v-if="showRatingInputId === group.item.id">
            <b-input
              v-for="n in jurorCount"
              :class="`rating-input mr-2 rating-input-${group.item.id}`"
              type="number"
              step=".1"
              :key="n"/>
            <font-awesome-icon
              class="check-icon ml-2"
              icon="check"
              @click.stop="updateRating(group.item.id)"/>
            <font-awesome-icon
              class="x-icon ml-3"
              icon="times"
              @click.stop="resetRating()"/>
          </div>
        </div>
      </template>
    </b-table>
  </div>
</template>

<script>
import GroupService from '@/services/group.service';
import ClassificationService from '@/services/classification.service';
import SettingService from '@/services/setting.service';

export default {
  name: 'Schedule',
  data() {
    return {
      currentPage: '1',
      perPage: '10',
      groups: [],
      classifications: [],
      filter: '',
      showTimeInputId: '',
      showRatingInputId: '',
      jurorCount: 0,
      fields: [
        { key: 'time', label: 'Time', sortable: true },
        { key: 'name', label: 'Group', stickyColumn: true },
        { key: 'club.name', label: 'Club' },
        { key: 'classification.name', label: 'Category' },
        { key: 'showRating', label: 'Rating', sortable: true },
      ],
    };
  },
  async mounted() {
    const { jurorCount, scheduleFilter } = SettingService.getAllSettings();
    this.jurorCount = parseInt(jurorCount, 10);
    if (scheduleFilter) {
      this.filter = parseInt(scheduleFilter, 10);
    }
    const groups = await GroupService.getAllGroups();
    this.groups = groups.data;
    const classifications = await ClassificationService.getAllClassifications();
    this.classifications = classifications.data;
  },
  computed: {
    sortedGroups() {
      let sortedGroups = [...this.groups].sort((a, b) => {
        let aTime = '00:00:00';
        let bTime = '00:00:00';
        if (a.time) {
          aTime = a.time;
        }
        if (b.time) {
          bTime = b.time;
        }
        return aTime > bTime ? 1 : -1;
      });
      sortedGroups = sortedGroups.filter((group) => group.classification !== null && (group.classification.id === this.filter || this.filter === ''));
      return sortedGroups;
    },
    rowCount() {
      return this.sortedGroups.length;
    },
  },
  methods: {
    filterTable(classId) {
      this.filter = classId;
      SettingService.setScheduleFilter(classId);
    },
    formatRating(showRating) {
      if (showRating) {
        let sum = 0;
        showRating.ratings.forEach((rating) => {
          sum += rating.value;
        });
        return sum;
      }
      return 0;
    },
    formatTime(time) {
      if (time) {
        return time.slice(0, 5);
      }
      return '00:00';
    },
    editTime(groupId) {
      this.showTimeInputId = groupId;
    },
    async updateTime(id) {
      const timeInput = document.querySelector(`#time-input-${id}`);
      const { value } = timeInput;
      await GroupService.updateTime(id, value);
      this.showTimeInputId = '';
      const { data } = await GroupService.getAllGroups();
      this.groups = data;
    },
    editRating(groupId) {
      this.showRatingInputId = groupId;
    },
    async updateRating(id) {
      const ratingInputs = document.querySelectorAll(`.rating-input-${id}`);
      const ratings = [...ratingInputs].map((input) => parseFloat(input.value));
      await GroupService.updateRating(id, ratings);
      this.showRatingInputId = '';
      const { data } = await GroupService.getAllGroups();
      this.groups = data;
    },
    resetRating() {
      this.showRatingInputId = '';
    },
  },
};
</script>

<style scoped>
.check-icon{
  color: #3ac18c;
}
.x-icon {
  color: #ff7851;
}
.rating-input{
  width:60px;
}
</style>
