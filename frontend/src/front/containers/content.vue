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
    width: 75%;
    margin: auto;
    margin-top: -5rem;
    background-color: #ebe9e0;
    box-shadow: 0px 0px 2px 0px rgba(0,0,0,0.75);
    border-radius: 1px;
  }
</style>
