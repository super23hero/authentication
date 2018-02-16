<template>
    <section>
      <h2 class="d-flex pb-3 pt-3 justify-content-between">
        Usuários
        <router-link to="/admin/users/new" tag="a">
          <button type="button" class="btn btn-primary">Novo</button>
        </router-link>
      </h2>


      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
          <tr>
            <th v-for="columnName in header">{{columnName}}</th>
            <th>Ações</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="user in userList">
            <td>{{user._id}}</td>
            <td>{{user.name}}</td>
            <td>
              <router-link :to="'/admin/users/'+user._id" tag="a">
                <button type="button" class="btn btn-secondary"><i class="fa fa-pencil"></i></button>
              </router-link>btn btn-outline-danger
              <confirmation-modal
                v-bind:confirmation-callback="deleteUser(user._id)"
                message="Deseja realmente deletar o usuário?"
                button-class="btn btn-outline-danger">
                <i slot="buttonContent" class="fa fa-trash"></i>
              </confirmation-modal>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <hr>
      <div class="table-counter">
        {{userList.length}} de {{userList.length}}
      </div>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item disabled">
            <a class="page-link" href="#" tabindex="-1">Previous</a>
          </li>
          <li class="page-item active"><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </section>
</template>

<script>
    import RequestService from '../../../core/RequestService'
    import confirmationModal from '../../components/confirmation-modal.vue'

    export default {
        name: 'usersList',
        components: {
          'confirmation-modal': confirmationModal,
        },
        data() {
            return {
                userList: [],
                requestService: new RequestService(),
                header: [
                  'ID',
                	'Nome',
                ],
              showModal: false
            }
        },
        methods: {
          deleteUser(userId) {
          	this.requestService
              .delete('users', userId)
              .then(response => {
              	console.log('deleted', response);
              })
              .catch(error => {
              	console.log(error);
              })
          }
        },
        created() {
            this.requestService
                .retrieve('users')
                .then(response => {
                  this.userList = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
</script>
