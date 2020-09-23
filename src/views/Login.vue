<template>
  <div class="login">
    <b-card border-variant="white">
      <b-alert show variant="danger" v-show="isError" dismissible>{{
        error
      }}</b-alert>
      <b-card-header header-bg-variant="white" header-border-variant="white">
        <b-card-text>
          <h1>Login</h1>
        </b-card-text>
        <b-card-text>
          <p class="text-left">Hi, Welcome back!</p>
        </b-card-text>
      </b-card-header>
      <b-card-body>
        <b-form @submit.prevent="onSubmit">
          <b-form-group id="input-group-1">
            <label for="input-1">Email</label>
            <b-form-input
              id="input-1"
              type="email"
              size="sm"
              required
              v-model="form.user_email"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2">
            <label for="input-2">Password</label>
            <b-form-input
              id="input-2"
              type="password"
              size="sm"
              required
              v-model="form.user_password"
            ></b-form-input>
          </b-form-group>

          <b-card-text>
            <p class="text-right">Forgot Password?</p>
          </b-card-text>

          <b-button type="submit" block>Submit</b-button>
        </b-form>
      </b-card-body>
      <b-card-footer footer-bg-variant="white" footer-border-variant="white">
        <b-card-text>
          <p class="text-center">Don't have an account? <span>Sign Up</span></p>
        </b-card-text>
      </b-card-footer>
    </b-card>
  </div>
</template>

<style scoped>
.login {
  text-align: left;
  background: #f6f6f6;
  height: 100vh;
  padding: 100px;
}

.card {
  border-radius: 30px;
  box-shadow: 0px 20px 20px rgba(126, 152, 223, 0.05);
  max-height: 37rem;
  max-width: 25rem;
  margin: auto;
}

.card-header h1 {
  font-weight: 500;
  font-size: 22px;
  text-align: center;
  color: #7e98df;
}

.card-header .text-left {
  font-size: 14px;
  color: #232323;
  margin: 0;
}

.card-body .text-right {
  font-size: 16px;
  color: #7e98df;
}

.form-control {
  border-top-color: transparent;
  border-right-color: transparent;
  border-bottom-color: #232323;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-left-color: transparent;
}

.form-group label {
  font-size: 14px;
  color: #848484;
  opacity: 0.75;
}

.btn-secondary {
  background-color: #7e98df;
  border-radius: 30px;
  border: transparent;
  font-weight: 500;
  font-size: 16px;
  padding: 0.8em;
}

.card-footer .text-center {
  font-size: 14px;
  color: #313131;
}

@media screen and (max-width: 768px) {
  .login {
    padding: 50px;
  }
}

@media screen and (max-width: 375px) {
  .login {
    padding: 40px;
  }
}
</style>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Login',
  data: () => ({
    form: {
      user_email: '',
      user_password: ''
    },
    isError: false,
    error: ''
  }),
  methods: {
    ...mapActions(['login']),
    onSubmit() {
      this.login(this.form)
        .then(result => {
          this.$router.push('/')
        })
        .catch(error => {
          this.isError = true
          this.error = error
        })
    }
  }
}
</script>
