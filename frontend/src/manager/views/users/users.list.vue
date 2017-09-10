<template>
    <div>
        <h1>Users List</h1>

        <ul>
            <li v-for="user in userList">
              <div>
                <span>
                  {{user.name}}
                </span>
                <span>
                  <button type="button" v-on:click="onDelete(user.id)">Delete</button>
                </span>
              </div>
            </li>
        </ul>
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
          onDelete(userId) {
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
