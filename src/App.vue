<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-light bg-light mb-2" v-if="loggedIn">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Clubs</router-link>
          </li>
          <li>
            <router-link class="nav-link" to="/schedule">Schedule</router-link>
          </li>
        </ul>
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/settings">Settings</router-link>
          </li>
          <li class="nav-item"><a href @click.prevent="logout" class="nav-link">Logout</a></li>
        </ul>
      </div>
    </nav>
    <div class="container mb-4">
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout', this.user);
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
.router-link-exact-active{
  color: #5a5a5a !important;
}
</style>
