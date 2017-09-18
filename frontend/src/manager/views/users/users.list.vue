<template>
    <div>
      <h1>Users List</h1>
      <div class="datatable-counter">
        15 modelos de fluxo | 5 abertos | 0 fechados
      </div>
      <table class="datatable">
        <thead class="datatable__header">
          <tr>
            <th v-for="columnName in header">{{columnName}}</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody class="datatable__body">
          <tr class="animated fadeIn" v-for="user in userList">
            <td data-title="ID">{{user._id}}</td>
            <td data-title="Nome">{{user.name}}</td>
            <td>
              <button class="datatable__delete-btn" @click="deleteUser(user.id)"><i class="fa fa-trash"></i></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
    import RequestService from '../../../core/RequestService'

    export default {
        name: 'usersList',
        components: {
        },
        data() {
            return {
                userList: [],
                requestService: new RequestService(),
                header: [
                  'ID',
                	'Nome',
                ]
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
