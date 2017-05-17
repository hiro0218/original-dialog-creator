<template>
 <div id="app" class="ui padded text container segment">
  <router-view></router-view>
 </div>
</template>

<script>
  import store from 'renderer/vuex/store'
  export default {
    store
  }
</script>

<style lang="scss">
  @import "../../semantic/dist/semantic.min.css";

  #app {
    font-family: "Yu Gothic", YuGothic, sans-serif;
    cursor: default;
    user-select: none;
    -webkit-font-smoothing: antialiased;
  }
</style>
