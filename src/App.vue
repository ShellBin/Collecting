<template>
  <div id="app">
    <div class="background"></div>
    <div class="admin-view-button" @click="isAdmin = !isAdmin" role="button"><span v-show="isAdmin">戳这边返回！</span><span v-show="!isAdmin">管理点这儿！</span></div>
    <div class="content">
      <template v-if="!isAdmin"> <IndexPage/> </template>
      <template v-if="isAdmin"> <AdminPage/> </template>
    </div>
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
html {
  height: 100%;
}
body {
  margin: 0;
  height: 100%;
}
a {
  color: #42b983;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}

.background {
  position: absolute;
  z-index: -20;
  top: 0; right: 0; bottom: 0; left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom right, #d5e6ee, #81a3aa);
}
.admin-view-button {
  z-index: 100;
  color: white;
  position: absolute;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
}
.content {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.button {
  border: 4px solid white;
  background-color: #A8DBD6;
  color: white;
  border-radius: 9px;
  font-weight: bolder;
  padding: 0.5rem;
  font-size: 1.2rem;
  cursor: pointer;
}
</style>
