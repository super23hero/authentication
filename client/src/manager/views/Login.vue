<script>
  export default {
    name: 'Login',
    methods: {
      doLogin() {
        this.$store.dispatch('LOGIN', { login: this.login, password: this.password });
      }
    },
    data() {
      return {
        login: '',
        password: '',
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
                <v-toolbar-title>Login form</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" v-model="login" label="Login" type="text"></v-text-field>
                  <v-text-field prepend-icon="lock" name="password" v-model="password" label="Password" id="password" type="password"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="doLogin">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>
