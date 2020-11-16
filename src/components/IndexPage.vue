<template>
  <div class="index_page">
    <div id="home_layer">
      <h2 class="title">"{{titleName}}"收集</h2>
      <div class="info">
        <p>填写所需要的信息，后台会自动帮你重命名的</p>
        <div v-if="">
          <label>学号:　　</label>
          <input v-model.lazy="infoStore.stuId" placeholder="">
        </div>
        <div>
          <label>姓名:　　</label>
          <input v-model.lazy="infoStore.name" placeholder="">
        </div>
        <div v-if="">
          <label>身份证号:</label>
          <input v-model.lazy="infoStore.classStr" placeholder="">
        </div>
      </div>
      <input type="file" />
      <div class="button start" role="button" v-if="!haveStarted" @click="updateStart">
        <span>上传文件</span>
      </div>
    </div>
    
    
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      titleName: '文件测试',
      haveStarted: false,
      infoStore: {}
    }
  },
  mounted() {
  },
  methods: {
    updateStart () {
      this.haveStarted = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index_page {
  width: 100%
}
a {
  color: #42b983;
}
.button {
  border: 1px solid #2c3e50;
  border-radius: 9px;
  padding: 1rem;
}
.start {
  width: 10rem;
  margin: 1rem auto;
  font-size: 1.2rem;
}
</style>