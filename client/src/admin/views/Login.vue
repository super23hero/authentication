<script>
  export default {
    name: 'Login',
    methods: {
      login() {
        const { username, password } = this;
        this
          .$store
          .dispatch('AUTH_REQUEST', { username, password })
          .then(() => this.$router.push('/'));
      }
    },
    data() {
      return {
        username: '',
        password: '',
      }
    },
    computed: {
      isLoading() {
        return this.$store.getters.authStatus === 'loading';
      },
      showError() {
        return this.$store.getters.authStatus === 'error';
      }
    }
  }
</script>

<template>
  <v-app id="inspire">
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4>

            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Adote o natal</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-alert type="error" :value="showError">
                  Failed to login, invalid credentials
                </v-alert>
                <v-form>
                  <v-text-field
                    prepend-icon="person"
                    name="username"
                    v-model="username"
                    label="Username"
                    type="text"></v-text-field>
                  <v-text-field
                    prepend-icon="lock"
                    name="password"
                    v-model="password"
                    label="Password"
                    type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="login" :loading="isLoading">Login</v-btn>
              </v-card-actions>
            </v-card>

          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
