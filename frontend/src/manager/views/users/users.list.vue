<template>
    <div>
        <h1>Users List</h1>

        <!--<div class="datatable">-->
            <!--<div class="datatable__header">-->
              <!--<div class="datatable__column-name" v-for="columnName in header">-->
                <!--{{columnName.name}}-->
              <!--</div>-->
            <!--</div>-->
            <!--<div class="datatable__row" v-for="row in data">-->
                <!--<div class="datatable__cell">-->
                  <!--{{user.name}}-->
                <!--</div>-->
                <!--<div>-->
                  <!--<button type="button" @click="deleteUser(user.id)">Delete</button>-->
                <!--</div>-->
            <!--</div>-->
        <!--</div>-->

      <div class="datatable-counter">
        15 modelos de fluxo | 5 abertos | 0 fechados
      </div>
      <table class="datatable">
        <thead class="datatable__header">
          <tr>
            <th>Nome do modelo</th>
            <th>Última atualização</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody class="datatable__body">
          <tr class="animated fadeIn">
            <td data-title="Nome do modelo">Solicitação de manutenção</td>
            <td data-title="Última atualização">21/12/2016 às 14:31</td>
            <td data-title="Status">3 fluxos abertos, 1 fechado e 1 pendente</td>
            <td>
              <button class="datatable__delete-btn"><i class="fa fa-trash"></i></button>
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
                userList : [
                    {
                        name: 'Pedro'
                    },
                    {
                        name: 'João'
                    }
                ],
              requestService: new RequestService()
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
