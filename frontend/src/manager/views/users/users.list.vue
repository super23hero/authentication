<template>
    <div>
        <h1>Users List</h1>

        <div class="datatable">
            <div class="datatable__header">
              <div class="datatable__column-name" v-for="columnName in header">
                {{columnName.name}}
              </div>
            </div>
            <div class="datatable__row" v-for="row in data">
                <div class="datatable__cell">
                  {{user.name}}
                </div>
                <div>
                  <button type="button" @click="deleteUser(user.id)">Delete</button>
                </div>
            </div>
        </div>
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
