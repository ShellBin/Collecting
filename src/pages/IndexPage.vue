<template>
  <div class="index_page">
    <div id="upload_layer" v-if="haveAnyTask">
      <h2 class="title">"{{titleName}}" 收集</h2>
      <div class="info">
        <p>填写信息，后台会自动帮你重命名的</p>
        <div class="forms" v-if="">
          <label>学号:　　</label>
          <input v-model.lazy="infoStore.stuId" placeholder="">
        </div>
        <div class="forms">
          <label>姓名:　　</label>
          <input v-model.lazy="infoStore.name" placeholder="">
        </div>
        <div class="forms" v-if="">
          <label>身份证号:</label>
          <input v-model.lazy="infoStore.idCard" placeholder="">
        </div>
      </div>
      <input type="file" multiple />
      <p>第二次提交将会覆盖上一次的提交</p>     
      <div class="button start" role="button" v-show="!haveStarted" @click="updateStart">
        <span>上传文件</span>
      </div>
    </div>
   
   <div id="alart_layer" v-if="!haveAnyTask">
     <h2>当前没有文件需要上传</h2>
   </div> 
    
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      haveAnyTask: true,
      titleName: '文件',
      haveStarted: false,
      infoStore: {
        stuId: '',
        name: '',
        idCard: ''
      }
    }
  },
  mounted() {
    this.fetchTask()
  },
  methods: {
    updateStart () {
      if (this.haveStarted === true) {
        alert('上传已经开始')
      } else {
        this.haveStarted = true 
      }
    },
    fetchTask () {
      this.axios.get('https://api.uixsj.cn/hitokoto/get?type=hitokoto&code=json')
        .then(function (response) {
          console.log(response.data.content)
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index_page {
  width: 100%
}
.button {
  border: 1px solid #2c3e50;
  border-radius: 9px;
  padding: 1rem;
}
.start {
  width: 10rem;
  margin: 2rem auto 0.7rem;
  font-size: 1.2rem;
}
.info {
  margin: 1rem auto;
}
.forms {
  margin: 0.4rem auto;
}
</style>