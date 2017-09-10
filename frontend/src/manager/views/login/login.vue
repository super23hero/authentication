<template>
    <div>
        <h1>Login</h1>
        <form method="POST" @submit.prevent="onSubmit" @keydown="form.errors.clear($event.target.name)">
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
    import authService from '../../../core/Auth'
    import Form from '../../../core/Form'

    export default {
        name: 'login',
        components: {
        },
        data() {
            return {
                form: new Form({
                    username: '',
                    password: ''
                })
            }
        },
        methods: {
            onSubmit() {
                let creds = this.form;

                authService
                    .login(creds, '/admin/users/list')
                    .catch(errors => {
                        this.form.showErrors(errors);
                    });
            }
        }
    }
</script>
