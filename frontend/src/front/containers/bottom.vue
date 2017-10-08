<template>
    <div class="footer">
      <h1>Footer</h1>
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
    background-color: red;
    min-height: 10rem;
  }
</style>
