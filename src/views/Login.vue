<template>
  <div class="col-md-12">
    <b-card>
      <validation-observer v-slot="{ invalid }">
        <b-form name="form" @submit.prevent="handleLogin">
          <b-form-group label="Username" label-for="username">
            <validation-provider rules="required" v-slot="{ errors }">
              <b-form-input
              v-model="user.username"
              id="username"
              autocomplete="username"
            />
            <span>{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
          <b-form-group label="Password" label-for="password">
            <validation-provider rules="required" v-slot="{ errors }">
              <b-form-input
              v-model="user.password"
              type="password"
              class="form-control"
              id="password"
              autocomplete="current-password"
            />
            <span>{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
          <b-form-group>
            <b-button variant="primary" block type="submit" :disabled="invalid">
              Login
            </b-button>
          </b-form-group>
        </b-form>
      </validation-observer>
      <div class="alert alert-danger alert-dismissible" role="alert" v-if="message">
        {{message}}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </b-card>
  </div>
</template>

<script>
import User from '../models/user';

export default {
  name: 'Login',
  data() {
    return {
      user: new User(''),
      message: null,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push('/');
    }
  },
  methods: {
    handleLogin() {
      if (this.user.username && this.user.password) {
        this.$store.dispatch('auth/login', this.user).then(
          () => {
            this.$router.push('/');
          },
          (error) => {
            this.message = (error.response && error.response.data)
              || error.message
              || error.toString();
          },
        );
      }
    },
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}
</style>
