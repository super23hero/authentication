<template>
  <section>
    <h2 class="d-flex pb-3 pt-3 justify-content-between">
      Editar Usuário
      <router-link to="/admin/users" tag="a">
        <button type="button" class="btn btn-link">Voltar</button>
      </router-link>
    </h2>
    <form @submit.prevent="editUser" @keydown="form.errors.clear($event.target.name)">
      <div class="form-group">
        <label for="name">Nome:</label>
        <input v-model="form.name" type="text" id="name" name="name" class="form-control" placeholder="Digite seu nome">
        <small class="invalid-feedback" v-if="form.errors.has('name')" v-text="form.errors.get('name')"></small>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input v-model="form.email" type="text" id="email" name="email" class="form-control" placeholder="Digite seu e-mail">
        <span class="invalid-feedback" v-if="form.errors.has('email')" v-text="form.errors.get('email')"></span>
      </div>

      <div class="form-group">
        <label for="username">Username:</label>
        <input v-model="form.username" type="text" id="username" name="username" class="form-control" placeholder="Digite seu nome de usuário">
        <span class="invalid-feedback" v-if="form.errors.has('username')" v-text="form.errors.get('username')"></span>
      </div>

      <div class="form-group">
        <label for="oldPassword">Senha antiga:</label>
        <input v-model="form.oldPassword" type="password" id="oldPassword" name="oldPassword" class="form-control" placeholder="Digite sua senha">
        <span class="invalid-feedback" v-if="form.errors.has('password')" v-text="form.errors.get('password')"></span>
      </div>

      <div class="form-group">
        <label for="newPassword">Nova senha:</label>
        <input v-model="form.newPassword" type="password" id="newPassword" name="newPassword" class="form-control" placeholder="Digite sua senha">
        <span class="invalid-feedback" v-if="form.errors.has('password')" v-text="form.errors.get('password')"></span>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="form.errors.any()">Enviar</button>
    </form>
  </section>
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
        form: {},
        requestService: new RequestService(),
        userId: this.$route.params.id,
      }
    },
    created() {
      this.requestService
        .retrieve('users', this.userId)
        .then(response => {
        	this.form =  new Form(response.data);
        });


    },
    methods: {
      editUser() {
        let user = this.form.data();

        this.requestService
          .update('users', this.userId, user)
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
