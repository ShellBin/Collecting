<template>
  <div id="app">
    <div class="admin-view-button" @click="isAdmin = !isAdmin"><span v-show="isAdmin">返回</span><span v-show="!isAdmin">登录</span></div>
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

.admin-view-button {
  position: absolute;
  right: 50px;
  bottom: 50px;
}

</style>
