<template>
  <div>
    <h1>Users Edit</h1>
    <form method="POST" @submit.prevent="editUser" @keydown="form.errors.clear($event.target.name)">
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
        <label for="oldPassword" class="label">Senha antiga:</label>
        <input type="password" id="oldPassword" name="oldPassword" class="input" v-model="form.oldPassword">
        <span class="help is-danger" v-if="form.errors.has('oldPassword')" v-text="form.errors.get('oldPassword')"></span>
      </div>

      <div class="control">
        <label for="newPassword" class="label">Nova senha:</label>
        <input type="password" id="newPassword" name="newPassword" class="input" v-model="form.newPassword">
        <span class="help is-danger" v-if="form.errors.has('newPassword')" v-text="form.errors.get('newPassword')"></span>
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
    name: 'usersEdit',
    components: {

    },
    data() {
      return {
        form: new Form({
          name:'',
          email: '',
          username: '',
          oldPassword: '',
          newPassword: '',
        }),
        requestService: new RequestService(),
        userId: this.$route.params.id,
      }
    },
    created() {
      let userRetrieved = this.requestService.retrieve('users', this.userId);

      this.form.name = userRetrieved.name;
      this.form.email = userRetrieved.email;
      this.form.username = userRetrieved.username;
    },
    methods: {
      editUser() {
        let user = this.form;

        this.requestService
          .update('users', user)
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
