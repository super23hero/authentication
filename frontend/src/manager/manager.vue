<template>
  <div class="manager">
    <manager-menu v-show="matched"></manager-menu>
    <manager-content>
        <router-view name="managerRouter"></router-view>
    </manager-content>
  </div>
</template>

<script>

    import managerMenu from './containers/manager-menu.vue'
    import managerContent from './containers/manager-content.vue'

    export default {
        name: 'manager',
        components: {
        	'manager-menu': managerMenu,
          'manager-content': managerContent
        },
        data () {
            return {

            }
        },
        computed: {
          matched: function() {
            return this.$route.path.indexOf('login') < 0;
          }
        }
    }
</script>

<style>
  .manager {
    height: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
  }
</style>
