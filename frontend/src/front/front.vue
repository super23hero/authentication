<template>
    <div class="main">
        <div class="content-container">
          <top></top>
          <middle>
            <router-view name="frontRouter"></router-view>
          </middle>
        </div>
        <bottom></bottom>
    </div>
</template>

<script>
    import top from './containers/top.vue'
    import middle from './containers/content.vue'
    import bottom from './containers/bottom.vue'

    export default {
        name: 'front',
        components: {
            top,
            middle,
            bottom
        },
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        }
    }
</script>

<style>

  .main {
    min-height: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
  }

  .content-container {
    flex: 1;
    height: 100%;
    padding-bottom: 10rem;
    background-color: #fff;
  }
</style>
