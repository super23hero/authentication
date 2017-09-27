<template>
  <main>
    <manager-menu></manager-menu>
    <manager-content>
        <router-view name="managerRouter"></router-view>
    </manager-content>
  </main>
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
        }
    }
</script>
