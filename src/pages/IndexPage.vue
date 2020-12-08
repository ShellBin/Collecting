<template>
  <div class="index_page">
    <div class="update-form">
      <div class="alert_layer" v-if="!haveAnyTask">
        <h2>当前没有文件需要上传</h2>
        <p>或网速太慢获取不到任务（小声</p>
      </div>

      <div class="upload_layer" v-if="haveAnyTask">
        <div>
          <h2 class="title">"{{ titleName }}" 收集</h2>
          <div v-show="!haveStarted" class="forms">
            <div style="text-align: left; padding-left: 2rem">
              <label>学号后三位：</label><br>
              <input v-model.lazy="stuId" style="margin: 0.5rem 0" maxlength="3">
            </div>
            <input type="file" ref="file">
          </div>
        </div>
        <div>
          <h3>{{ displayStatus }}</h3>
          <h4>{{ displayMessage }}</h4>
        </div>
        <div class="info-and-button">
          <div class="button start" role="button" v-show="!haveStarted" @click="uploadStart"><span>上传文件</span></div>
          <div class="button start" role="button" v-show="isError" @click="back"><span>返回</span></div>
          <p>第二次提交将会覆盖上一次的提交</p>
          <p class="intro">仅面向 {{ className }} 使用</p>
          <p class="intro">自动重命名打包下载，收集更方便</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Compressor from 'compressorjs';

export default {
  name: 'IndexPage',
  data () {
    return {
      haveAnyTask: false,
      titleName: '文件',
      className: '某校某系某班',
      haveStarted: false,
      isError: false,
      stuId: '',
      displayStatus: '等待选择文件上传中',
      displayMessage : ''
    }
  },
  mounted() {
    this.fetchTask()
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
      this.axios.post(this.backEndHost + 'uploadFile', data, {
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
            console.error(error)
          })
    },
    fetchTask () {
      this.axios.get(this.backEndHost + 'fetchTask')
        .then((response) => {
          if(response.data.status === 'ok') {
            console.log('获取到了任务')
            this.haveAnyTask = response.data.haveAnyTask
            this.titleName = response.data.titleName
            this.className = response.data.className
          } else console.log('API 内部出错')
        })
        .catch(function (error) {
          console.error(error)
        })
    },
    back () {
      this.isError = false
      this.haveStarted = false
      this.displayStatus = '等待选择文件上传中'
      this.displayMessage = '希望这次你能成功上传'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
input{
  outline-style: none;
  padding: 0.4rem;
  width: 10rem;
  background-color: #f7f7f7;
  border: none;
}
.index_page {
  width: 85%;
  height: 85%;
  background: white url("../assets/background.jpg") no-repeat bottom left;
  position: relative;
  display: flex;
  justify-content: flex-end;
  border-radius: 9px;
}
.update-form {
  margin-top: 5rem;
  margin-right: 15vw;
}
@media (max-width: 1000px) and (orientation: portrait) {
  .index_page {
    justify-content: center;
  }
  .update-form {
    margin-top: 8vw;
    margin-right: 0;
  }
  .upload_layer {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
.button {
  border: 4px solid white;
  background-color: #A8DBD6;
  border-radius: 9px;
  padding: 0.5rem;
}
.start {
  font-weight: bolder;
  color: white;
  width: 10rem;
  margin: 2rem auto 0.7rem;
  font-size: 1.2rem;
}
.info-and-button {
  margin: 7vw auto 3vw;
}
.forms {
  margin: 2vw auto 7vw;
}
.intro {
  margin: 0;
  font-size: 0.8rem;
}
</style>
