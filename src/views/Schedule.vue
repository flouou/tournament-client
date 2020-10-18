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
        </tr>
      </thead>
      <tbody>
        <tr v-for="group in sortedGroups" :key="group.id">
          <th class="time" @click="editTime(group.id)">
            <span v-if="showTimeInputId !== group.id">{{formatTime(group.time)}}</span>
            <div v-if="showTimeInputId === group.id">
              <input
                type="time"
                :value="formatTime(group.time)"
                :id="`time-input-${group.id}`"/>
              <font-awesome-icon
                class="check-icon ml-2"
                icon="check"
                @click.stop="updateTime(group.id)"/>
            </div>
          </th>
          <td>{{group.name}}</td>
          <td>{{group.club.name}}</td>
          <td>{{group.classification.name}}</td>
          <td @click="editRating(group.id)">
            <span v-if="showRatingInputId !== group.id">{{ formatRating(group.showRating) }}</span>
            <div v-if="showRatingInputId === group.id">
              <input
                v-for="n in jurorCount"
                :class="`rating-input mr-2 rating-input-${group.id}`"
                type="number"
                step=".1"
                :key="n"/>
              <font-awesome-icon
                class="check-icon ml-2"
                icon="check"
                @click.stop="updateRating(group.id)"/>
              <font-awesome-icon
                class="x-icon ml-2"
                icon="times"
                @click.stop="resetRating()"/>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
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
      groups: [],
      classifications: [],
      filter: '',
      showTimeInputId: '',
      showRatingInputId: '',
      jurorCount: 0,
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
      return '';
    },
    formatTime(time) {
      if (time) {
        return time.slice(0, 5);
      }
      return '';
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
