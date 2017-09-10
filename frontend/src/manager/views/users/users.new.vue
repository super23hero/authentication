<template>
  <div>
    <h1>Users New</h1>
    <form method="POST" @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
      <div class="control">
        <label for="name" class="label">Nome:</label>
        <input type="text" id="name" name="name" class="input" v-model="form.name">
        <span class="help is-danger" v-if="form.errors.has('name')" v-text="form.errors.get('name')"></span>
      </div>

      <div class="control">
        <label for="email" class="label">Email:</label>
        <input type="text" id="email" name="email" class="input" v-model="form.email">
        <span class="help is-danger" v-if="form.errors.has('email')" v-text="form.errors.get('email')"></span>
      </div>

      <div class="control">
        <label for="username" class="label">Username:</label>
        <input type="text" id="username" name="username" class="input" v-model="form.username">
        <span class="help is-danger" v-if="form.errors.has('username')" v-text="form.errors.get('username')"></span>
      </div>

      <div class="control">
        <label for="password" class="label">Password:</label>
        <input type="password" id="password" name="password" class="input" v-model="form.password">
        <span class="help is-danger" v-if="form.errors.has('password')" v-text="form.errors.get('password')"></span>
      </div>

      <div class="control">
        <button class="button is-primary" :disabled="form.errors.any()">Create</button>
      </div>

    </form>
  </div>
</template>

<script>
  import Form from '../../../core/Form'
  import RequestService from '../../../core/RequestService'

  export default {
      name: 'usersNew',
      components: {

      },
      data() {
          return {
              form: new Form({
                  name:'',
                  email: '',
                  username: '',
                  password: '',
              }),
              requestService: new RequestService()
          }
      },
      methods: {
        onSubmit() {
          let user = this.form;

          this.requestService
            .create('users', user)
            .then(response => {
            	console.log('Hell yeah', response)
            })
            .catch(errors => {
              this.form.showErrors(errors);
            });
        }
      }
  }
</script>
