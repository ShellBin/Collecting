<template>
  <div id="app">
    <IndexPage/>
  </div>
</template>

<script>
import IndexPage from './components/IndexPage'

export default {
  name: 'App',
  components: {
    IndexPage
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
</style>