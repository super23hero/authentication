<template>
  <div class="content">
    <slot></slot>
  </div>
</template>

<script>
    export default {
        name: 'content',
        mounted() {
            console.log('Component mounted.')
        }
    }
</script>

<style scoped>
  .content {
    width: 75%;
    margin: auto;
    margin-top: -5rem;
    background-color: #fff;
    box-shadow: 0px 0px 10px 3px rgba(0,0,0,0.05);
    border-radius: 1px;
    padding: 1rem;
  }
</style>
