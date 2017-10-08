<template>
  <div>
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
