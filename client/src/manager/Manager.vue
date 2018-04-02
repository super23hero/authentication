<script>
  import Login from './views/Login'

  export default {
    name: 'Manager',
    components: {
      'login': Login
    },
    computed: {
      isLoggedIn() {
        return this.$store.state.isAuthenticated
      }
    }
  };
</script>

<template>
  <div>
    <login v-if="!isLoggedIn"></login>
    <p v-if="isLoggedIn">
      Estou logado
    </p>
  </div>
</template>
