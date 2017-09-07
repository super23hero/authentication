<template>
    <main>
        <top></top>
        <content>
            <router-view name="frontRouter"></router-view>
        </content>
        <bottom></bottom>
    </main>
</template>

<script>
    import top from './containers/top.vue'
    import bottom from './containers/bottom.vue'

    export default {
        name: 'front',
        components: {
            top,
            bottom
        },
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }
</script>