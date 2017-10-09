<template>
  <div class=hero>
    <div class="header">
      <div class="header__title">
        <h1>Adote o Natal</h1>
      </div>
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
    border-bottom: 3px solid purple;
    height: 20rem;
    background-color: aliceblue;
  }
</style>
