<template>
  <div class=hero>
    <div class="header">
      <div class="header__title">
        <h1>Adote o Natal</h1>
      </div>
      <nav class="menu">
        <router-link to="/" v-on:click="makeActive('home')">Home</router-link>
        <router-link to="/edicoes-anteriores" v-on:click="makeActive('home')">Edições Anteriores</router-link>
        <router-link to="/criancas" v-on:click="makeActive('home')">Crianças</router-link>
        <router-link to="/contato" v-on:click="makeActive('home')">Contato</router-link>
      </nav>
      <!--<nav v-bind:class="active" v-on:click.prevent>-->
        <!--<a href="#" class="home" v-on:click="makeActive('home')">Home</a>-->
        <!--<a href="#" class="projects" v-on:click="makeActive('projects')">Projects</a>-->
        <!--<a href="#" class="services" v-on:click="makeActive('services')">Services</a>-->
        <!--<a href="#" class="contact" v-on:click="makeActive('contact')">Contact</a>-->
      <!--</nav>-->
    </div>
  </div>
</template>

<script>
    export default {
        name: 'top',
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>

<style scoped>
  .hero {
    width: 100%;
    padding-top: 3rem;
    padding-bottom: 8rem;
    background-color: #FF5A5A;
  }

  .header {
    width: 75%;
    margin: auto;
    display: flex;
    justify-content: space-between;
  }

  .header__title {
    color: #fff
  }
</style>
