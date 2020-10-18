/* eslint-disable class-methods-use-this */
class SettingService {
  constructor() {
    this.settings = [
      'jurorCount',
      'scheduleFilter',
    ];
  }

  setScheduleFilter(classId) {
    localStorage.setItem('scheduleFilter', classId);
  }

  setJurorCount(count) {
    localStorage.setItem('jurorCount', count);
  }

  getAllSettings() {
    const settingsArray = this.settings.map((settingKey) => {
      const setting = {};
      setting[settingKey] = localStorage.getItem(settingKey);
      return setting;
    });

    const settingsObject = {};
    settingsArray.forEach((setting) => {
      const key = Object.keys(setting)[0];
      settingsObject[key] = setting[key];
    });
    return settingsObject;
  }
}

export default new SettingService();
