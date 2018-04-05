<script>
  import { mapGetters } from 'vuex';
  import Login from './views/Login';

  export default {
    name: 'Admin',
    components: {
      'login': Login
    },
    methods: {
      logout() {
        this.$store.dispatch('AUTH_LOGOUT')
          .then(() => this.$router.push('/login'));
      },
    },
    computed: {
      ...mapGetters(['isAuthenticated'])
    },
  };
</script>

<template>
  <div>
    <p v-if="isAuthenticated">
      Estou logado
      <button @click="logout">Logout</button>
    </p>
  </div>
</template>
