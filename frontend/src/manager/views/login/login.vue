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
              <button type="submit" class="btn btn-lg btn-success btn-block" :disabled="form.errors.any()">Sign in</button>
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
        })
      }
    },
    methods: {
      onSubmit() {
        let creds = this.form;

        authService
          .login(creds, '/admin')
          .catch(errors => {
            this.form.showErrors(errors);
          });
      }
    }
  }
</script>

<style>
  .login {
    margin-top: 30%;
    padding: 0.5rem;
    border-radius: 2px;
    box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.75);

  }
</style>
