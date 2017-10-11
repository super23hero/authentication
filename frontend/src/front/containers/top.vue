<template>
  <div class=hero>
    <div class="header">
      <div class="header__title">
        <h1>Adote o Natal</h1>
      </div>
      <nav class="menu">

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

<style>
  .hero {
    width: 100%;
    padding-bottom: 5rem;
    box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.75);
    background-color: #1f6d00;
  }

  .header {
    width: 75%;
    margin: auto;
    display: flex;
  }

  .header__title {

  }
</style>
