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

<style>
  .footer {
    width: 100%;
    box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.75);
    background-color: #ebe9e0;
  }

  .footer__container {
    width: 75%;
    margin: auto;
  }
</style>
