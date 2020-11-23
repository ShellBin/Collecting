<template>
  <div class="index_page">
    <div id="upload_layer" v-if="haveAnyTask">
      <h2 class="title">"{{titleName}}" 收集</h2>
      <div class="info">
        <p class="intro">是一项仅面向 {{className}} 的轻量服务</p>
        <p class="intro">填写信息一键提交，重命名等破事后台会帮你搞定</p>
        <p class="intro">同时，收集文件截图的同学也可以一键打包下载全班文件</p>
      </div>

      <div v-show="!haveStarted" class="forms">
        <label>学号后三位：</label>
        <input v-model.lazy="stuId" style="margin: 1rem 0">
        <br>
        <input type="file" ref="file">
      </div>

      <h2>状态：{{ displayStatus }}</h2>
      <h3>{{ displayMessage }}</h3>

      <div class="button start" role="button" v-show="!haveStarted" @click="uploadStart">
        <span>上传文件</span>
      </div>
      <div class="button start" role="button" v-show="isError" @click="back">
        <span>返回</span>
      </div>

      <p>第二次提交将会覆盖上一次的提交</p>
    </div>

   <div id="alert_layer" v-if="!haveAnyTask">
     <h2>当前没有文件需要上传</h2>
     <p>或网速太慢获取不到任务（小声</p>
   </div>

  </div>
</template>

<script>
import Compressor from 'compressorjs';

export default {
  name: 'IndexPage',
  data () {
    return {
      server:'http://localhost:8089/api/v1/',
      haveAnyTask: false,
      titleName: '文件',
      className: '某校某系某班',
      haveStarted: false,
      isError: false,
      stuId: '',
      displayStatus: '等待上传中',
      displayMessage : ''
    }
  },
  mounted() {
    if(location.hash !== '#admin') {
      this.fetchTask()
    }
  },
  methods: {
    uploadStart () {
      const thisFile = this.$refs.file.files[0]
      if (this.haveStarted === true) {
        alert('上传已经开始')
      } else {
        this.haveStarted = true
      }if (parseInt(this.stuId) > 0 && thisFile) {
        this.displayStatus = '文件正在上传...'
        this.displayMessage = '当前进度 0%'
        if(thisFile.type === ('image/png'||'image/jpeg')) {
          // 压缩并发送
          this.compressedPic(thisFile)
        } else {
          // 直接发送
          this.uploadFile(thisFile)
        }
        // 存储一下本次的学号
      } else {
        this.displayStatus = '还不能开始上传'
        this.displayMessage = '学号和文件是不是有什么没填好的？'
        this.isError = true
      }
    },
    compressedPic(pic) {
      this.displayMessage = '图片正在压缩'
      new Compressor(pic,{
        quality:0.5,
        maxWidth:720,
        success: (result) => {
          this.uploadFile(new File([result], result.name, {type: result.type}))
          console.log('图片已被压缩')
        }
      })
    },
    uploadFile(file) {
      const data = new FormData()
      data.append('file', file)
      this.axios.post(this.server + 'uploadFile', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'stuId': this.stuId
        },onUploadProgress: (progressEvent) => {
          this.displayMessage = '当前进度 ' + (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
        } })
          .then(res => {
            if(res.data.status === 'success') {this.displayStatus = '上传成功'; this.displayMessage = '当前命名：' + res.data.finalFileName}
          })
          .catch(error => {
            this.displayStatus = '上传失败'
            this.displayMessage = '检查学号是否正确，网络是否正常'
            this.isError = true
            console.log(error)
          })
    },
    fetchTask () {
      this.axios.get(this.server + 'fetchTask')
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
    },
    back () {
      this.isError = false
      this.haveStarted = false
      this.displayStatus = '等待上传中'
      this.displayMessage = '希望这次你能成功上传'
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
