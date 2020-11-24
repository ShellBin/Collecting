<template>
  <div id="app">
    <template v-if="!isAdmin"> <IndexPage/> </template>
    <template v-if="isAdmin"> <AdminPage/> </template>
  </div>
</template>

<script>
import IndexPage from './pages/IndexPage'
import AdminPage from './pages/AdminPage'

export default {
  name: 'App',
  components: {
    IndexPage,
    AdminPage
  },
  data () {
    return {
      isAdmin: false
    }
  },
  mounted() {
    console.log('欢迎使用')
    if(location.hash === '#admin') {
    //if(location.hash !== '#admin') { // 调试用途
      this.isAdmin = true
    }
  }
}
</script>

<style>
#app {
  display: flex;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
a {
  color: #42b983;
}

</style>