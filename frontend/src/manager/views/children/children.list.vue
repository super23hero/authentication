<template>
    <div>
        <h1>Children List</h1>

        <ul>
            <li v-for="user in userList">
                {{user.name}}
            </li>
        </ul>
    </div>
</template>

<script>
    import RequestService from '../../../core/RequestService'

    export default {
        name: 'childrenList',
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
//            RequestService
//                .retrieve('')
//                .then(response => {
//
//                })
//                .catch(error => {
//                    console.log(error);
//                });
        }
    }
</script>
