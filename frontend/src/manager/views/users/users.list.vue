<template>
    <div>
        <h1>Users List</h1>

        <ul>
            <li v-for="user of userList">
                {{user.name}}
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
                ]
            }
        },
        methods: {

        },
        created() {
            RequestService
                .retrieve('')
                .then(response => {

                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
</script>