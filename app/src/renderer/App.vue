<template>
 <div id="app">
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
  @import "~semantic-ui-css/semantic.css";

  *,
  *::before,
  *::after {
   box-sizing: border-box;
  }

  html {
   font-size: 100%;
   margin: 0;
   padding: 0;
  }

  html,
  body { height: 100%; }

  body {
    padding: 1rem;
  }
</style>
