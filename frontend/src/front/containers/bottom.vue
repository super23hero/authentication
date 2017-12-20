<template>
    <div class="footer">
      <div class="footer__container">
        <h1>Footer</h1>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'bottom',
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>

<style scoped>
  .footer {
    width: 100%;
    background-color: #FF5A5A;
  }

  .footer__container {
    padding-top: 3rem;
    padding-bottom: 3rem;
    width: 75%;
    margin: auto;
  }
</style>
