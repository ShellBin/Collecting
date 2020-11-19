<template>
  <div class="index_page">
    <div id="upload_layer" v-if="haveAnyTask">
      <h2 class="title">"{{titleName}}" 收集</h2>
      <div class="info">
        <p class="intro">是一项仅面向 {{className}} 的轻量服务</p>
        <p class="intro">填写信息一键提交，重命名等破事后台会帮你搞定</p>
        <p class="intro">同时，收集文件、截图的同学也可以一键打包下载全班文件</p>
        <div class="forms">
          <label>学号后三位：</label>
          <input v-model.lazy="stuId" placeholder="">
        </div>
      </div>
      <input type="file" multiple/>
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
      haveAnyTask: false,
      titleName: '文件',
      className: '某校某系某班',
      haveStarted: false,
      stuId: ''
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
      this.axios.get('http://127.0.0.1:8089/api/v1/fetchTask')
        .then((response) => {
          if(response.data.status === 'ok') {
            this.haveAnyTask = response.data.haveAnyTask
            this.titleName = response.data.titleName
            this.className = response.data.className
          } else console.log('API 内部出错')
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
  margin: 1.2rem auto;
}
.intro {
  margin: 0;
}
</style>
