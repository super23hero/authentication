<template>
  <div class="manager__content">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'managerContent',
    mounted() {
      console.log('Component mounted.')
    }
  }
</script>

<style>
  .manager__content {
    height: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
  }
</style>
