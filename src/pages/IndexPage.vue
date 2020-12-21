<template>
  <div class="index_page">
    <div class="update-form">

      <div class="alert_layer" v-if="!haveAnyTask">
        <h2>当前没有文件需要上传</h2>
        <p>或网速太慢获取不到任务（小声</p>
      </div>

      <div class="upload_layer" v-if="haveAnyTask">
        <div class="header-and-form">
          <h2 class="title">"{{ titleName }}" 收集</h2>
          <div v-show="!haveStarted" class="forms" style="text-align: left; padding-left: 2.2rem">
            <label>学号后三位：</label><br>
            <input v-model="stuId" placeholder="三位数字填这里" maxlength="3" class="input-text" @input="checkStuId">
            <input type="file" id="file" ref="file" style="display: none" @change="fileChanged">
          </div>
        </div>
        <div class="displayString">
          <h3>{{ displayStatus }}</h3>
          <h4>{{ displayMessage }}</h4>
        </div>
        <div class="button-and-intro">
          <div class="button start" role="button" style="background-color: #748987;" v-show="!haveStarted && !allowUpload"><span>当前不可上传文件</span></div>
          <div class="button start" role="button" v-show="!haveStarted && allowUpload" @click="fileChanged"><span>上传文件</span></div>
          <div class="button start" role="button" v-show="isError" @click="back"><span>返回</span></div>
          <p style="margin-bottom: 0.4rem">第二次提交将会覆盖上一次的提交</p>
          <p class="intro">仅面向 {{ className }} 使用</p>
          <p class="intro">自动重命名压缩一键下载，收集更方便</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Lrz from 'lrz';

export default {
  name: 'IndexPage',
  data () {
    return {
      haveAnyTask: false,
      titleName: '文件',
      className: '某校某系某班',
      haveStarted: false,
      isError: false,
      allowUpload: false,
      stuId: '',
      displayStatus: '请先填写学号后三位',
      displayMessage : '',
    }
  },
  mounted() {
      this.fetchTask()
  },
  methods: {
    checkStuId () {
      if (this.stuId.length > 2) {
        if (parseInt(this.stuId) > 0){
          this.displayStatus = '可以上传了！'
          this.allowUpload = true
        } else {
          this.displayStatus = '学号真的写对了吗？'
        }
      } else {
        this.displayStatus = '请先填写学号后三位'
        this.allowUpload = false
      }
    },
    fileChanged () {
      if (!this.$refs.file.files[0]) {
        document.getElementById("file").click()
      }
      if (this.$refs.file.files[0]) {
        if(this.$refs.file.files[0].name.length < 12) {
          this.displayStatus = '已选择 ' + this.$refs.file.files[0].name
        } else {
          this.displayStatus = '已选择 ' + this.$refs.file.files[0].name.substring(0,12)+'...'
        }
        if (this.$refs.file.files[0]) {
          this.uploadStart ()
        }
      }
    },
    uploadStart () {
      this.haveStarted = true
      const thisFile = this.$refs.file.files[0]
      this.displayStatus = '文件正在上传，请不要关闭页面...'
      this.displayMessage = '当前进度 0%'
      console.log(thisFile.type)
      if(thisFile.type.match('image')) {
        this.compressedPic(thisFile)
      } else {
        const data = new FormData
        data.append('file',thisFile)
        this.uploadFile(data)
      }
    },
    compressedPic(pic) {
      this.displayMessage = '图片正在压缩'
      new Lrz(pic,{width: 640})
      .then((result) => {
        this.uploadFile(result.formData)
      })
    },
    uploadFile(file) {
      this.axios.post(this.backEndHost + 'uploadFile', file, {
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
            this.displayMessage = '学号、文件或网络出现了些问题'
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
      this.$refs.file.value = ''
      this.displayStatus = '点击下方按钮重新上传'
      this.displayMessage = '希望这次你能成功上传'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.index_page {
  width: 85%;
  height: 85%;
  background: white url("../assets/background.jpg") no-repeat bottom left;
  position: relative;
  display: flex;
  justify-content: flex-end;
  border-radius: 9px;
}
.input-text {
  border-radius: 9px;
  outline-style: none;
  padding: 0.6rem;
  margin: 0.6rem 0;
  width: 10rem;
  background-color: #d4e7e6;
  border: none;
}
.update-form {
  margin: 4vw 15vw 0 0;
}
@media (max-width: 1000px) and (orientation: portrait) {
  .title {
    margin: 0 0 10vw 0;
  }
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
@media (max-width: 350px) and (orientation: portrait) {
  .forms {
    margin: 2vw auto 4vw;
  }
  .input-file + label {
    background-size: 2rem 2rem;
    width: 2rem;
    height: 2rem;
  }
}
.start {
  width: 10rem;
  margin: 2rem auto 0.7rem;
}
.button-and-intro {
  margin: 6vw auto 3vw;
}
.forms {
  margin: 2vw auto 6vw;
}
.intro {
  margin: 0;
  font-size: 0.8rem;
}
</style>
