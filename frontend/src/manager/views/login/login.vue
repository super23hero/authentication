<template>
  <div class="container">
    <div class="row justify-content-center align-items-center">
      <div class="col-sm-12 col-md-6 col-lg-4">
        <div class="login">
          <div class="panel-heading">
            <h3 class="panel-title">
              <strong>Sign In </strong>
            </h3>
          </div>
          <div class="panel-body">
            <form role="form" method="POST" @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
              <div class="alert alert-danger" v-if="hasError" role="alert">
                Login ou senha incorreto.
              </div>
              <div class="form-group">
                <label for="username" class="label">Username or Email</label>
                <input type="text" class="form-control" id="username" name="username" v-model="form.username" placeholder="Enter email">
                <span class="help is-danger" v-if="form.errors.has('username')" v-text="form.errors.get('username')"></span>
              </div>
              <div class="form-group">
                <label for="password" class="label">Password <a href="/sessions/forgot_password">(forgot password)</a></label>
                <input type="password" class="form-control" id="password" name="password" v-model="form.password" placeholder="Password">
                <span class="help is-danger" v-if="form.errors.has('password')" v-text="form.errors.get('password')"></span>
              </div>
              <button type="submit" class="btn btn-lg btn-success btn-block" :disabled="form.errors.any() || isLoading">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {Auth as authService} from '../../../core/Auth'
  import Form from '../../../core/Form'

  export default {
    name: 'login',
    components: {},
    data() {
      return {
        form: new Form({
          username: '',
          password: ''
        }),
        hasError: false,
        isLoading: false,
      }
    },
    methods: {
      onSubmit() {
        let creds = this.form;
        this.isLoading = true;

        authService
          .login(creds, '/admin')
          .catch(errors => {
            this.form.showErrors(errors);
            this.hasError = true;
          })
          .then(() => {
            this.isLoading = false;
          });
      }
    }
  }
</script>

<style>
  .login {
    margin-top: 30%;
    padding: 1rem;
    border-radius: 0.3rem;
    box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.75);

  }
</style>
