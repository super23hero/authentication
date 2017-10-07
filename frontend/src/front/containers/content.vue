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

<style>
  .content {
    width: 1040px;
    margin: auto;
    margin-top: -5rem;
    background-color: green;
  }
</style>
