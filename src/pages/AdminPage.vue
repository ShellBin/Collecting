<template>
  <div class="admin_page">

    <div class="login_layer" v-if="!haveToken">
      <h2>管理员登录</h2>
      <h3>{{message}}</h3>
      <label style="font-size: 1.2rem">管理密码：</label>
      <input type="password" v-model.lazy="password" @keyup.enter="login" class="input-text">
      <div role="button" class="button login-button" @click="login">登录</div>
    </div>

    <div class="admin_layer" v-if="haveToken">
      <template v-if="!haveAnyTask">
        <h2>当前没有收集任务</h2>
        <h3>新建一个吧</h3>
        <div role="button" class="button" @click="creatNewTask">新建任务</div>
      </template>

        <div class="admin_view_layer" v-if="haveAnyTask">
          <h2>"{{taskName}}" 收集情况</h2>
          <h3>{{message}}</h3>

          <template v-if="newTaskMode">
            <label>本次任务名：</label>
            <input v-model.lazy="taskName" style="margin: 0.5rem 0"><br>
            <label>新命名格式：</label>
            <input v-model.lazy="namingRules" style="margin: 0.5rem 0"><br>
            <p style="color: grey">命名格式支持 <b>姓名、学号、身份证号、任务名、班级</b> 五种模板；命名模板之间可以用任何可作为文件名使用的符号连接（例如空格）</p>
            <div role="button" @click="updateTask" class="button creat-new-task"><span>新建</span></div>
          </template>

          <template v-if="!newTaskMode">
            <p style="max-width: 40rem; align-items: center; margin-bottom: 6rem">未上传名单：{{nameList}}</p>
            <h3>任务管理</h3>
            <div role="button" @click="downloadFile" class="button download-button"><span>下载已收集文件</span></div>
            <div role="button" @click="deleteTask" class="button delete-button"><span>关闭任务并删除文件</span></div>
          </template>
        </div>
      <div role="button" @click="logOut" style="margin-top: 3rem;"><span>退出登录状态</span></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPage',
  data () {
    return {
      haveToken: false, // 是否存在登录凭据
      haveAnyTask: false, // 是否存在任务
      newTaskMode: false, // 是否处于新建任务状态
      deleteFiles: false, // 是否打算删除文件
      isDownloading: false,
      message: '欢迎', // 注释
      taskName:'文件', // 任务名称
      namingRules:'姓名 学号', // 命名格式
      password: '', // 密码
      nameList: '空' // 名单
    }
  },
  mounted() {
    this.haveToken = Boolean(document.cookie.match(/^(.*;)?\s*token\s*=\s*[^;]+(.*)?$/))
    if(this.haveToken) {
      console.log('自动登录')
      this.login()
    }
  },
  methods: {
    login() {
      if(!this.haveToken && this.password === '') {
        this.message = '请输入密码'
      } else {
        //进入登录逻辑
        this.axios.post(this.backEndHost + 'login', {
          pw: this.password,
          withCredentials: true
        }).then (res => {
          if(res.data.status === 'success') {
            this.haveAnyTask = res.data.haveAnyTask
            this.taskName = res.data.titleName
            this.namingRules = res.data.namingRules
            this.message = ''
            if(res.data.nameList.length > 0){
              this.nameList = res.data.nameList + '，共 ' + res.data.nameList.length +' 人'
            }
            this.haveToken = true
            console.log('登录成功')
          } else {
            this.message = '凭据无效，请检查后重试'
            //删除 cookie
            this.clearAllCookie()
          }
        }).catch(error => {
          console.log(error)
          this.message = '网络错误'
        })
      }
    },
    clearAllCookie() {
      const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
      if(keys) {
        for(let i = keys.length; i--;) {
          document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
        }
      }
      this.haveToken = false
      alert('下次该输密码重新登录噜')
    },
    logOut () {
      this.clearAllCookie()
      this.$parent.isAdmin = false
    },
    updateTask() {
      if (this.namingRules !== '' && this.taskName !== '') {
        const reg = new RegExp('[\\\\/:*?\"<>|]')
        if (!reg.test(this.namingRules)) {
          this.axios.post(this.backEndHost + 'setTask', {
            titleName: this.taskName,
            namingRules: this.namingRules,
            deleteFiles: this.deleteFiles,
            haveAnyTask: this.newTaskMode,
            withCredentials: true
          }).then(res => {
            if (res.data.status === 'success') {
              this.newTaskMode = false
              this.message = '操作成功'
            } else {
              switch (res.data.message) {
                case 'invalid namingRules':
                  this.message = '使用了不支持的命名规则'
                      break
                case 'empty':
                  this.message = '太怪了，服务器说有东西空下没填'
                      break
                default:
                  this.message = '未知错误，重新登录试试吧'
              }
            }
          })
        } else {
          this.message = '命名规则中存在不合理的字符'
        }
      } else {
        this.message = '任务名和命名规则间有什么东西没填好啦'
      }
    },
    creatNewTask () {
      this.newTaskMode = true
      this.haveAnyTask = true
    },
    deleteTask () {
      this.deleteFiles = true
      this.haveAnyTask = false
      this.updateTask()
      setTimeout(() => {
        this.newTaskMode = true
        this.deleteFiles = false
        this.message = ''
        this.login()
      }, 800)
    },
    downloadFile () {
      if (!this.isDownloading) {
        this.isDownloading = true
        this.axios.get(this.backEndHost + 'downloadFiles', {
          responseType: 'blob',
          withCredentials: true,
          onDownloadProgress: (progressEvent) => {
            this.message = '文件正在服务器端打包并下载，进度 ' + (progressEvent.loaded / progressEvent.total * 100 | 0) + '%'
          }
        }).then (res => {
          this.message = '下载完成'
          const data = res.data
          if (!data) {
            this.message = '出错，请稍后重试'
            return
          }
          const thisFile = new Blob([data], {type:'application/zip'})
          let downLink = document.createElement('a')
          downLink.href = URL.createObjectURL(thisFile)
          document.body.appendChild(downLink)
          downLink.click()
          document.body.removeChild(downLink)
        }).catch((error) => {
          console.log(error)
        })
        setTimeout(() => {
          this.isDownloading = false
        },1000*5)
      } else {
        this.message = '不要点这么快啦'
        setTimeout(() => {
          this.message = '文件正在服务器端打包，下载将在稍后开始，请稍等'
        },1000)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.admin_page {
}
.input-text {
  border-radius: 9px;
  outline-style: none;
  padding: 0.7rem;
  width: 10rem;
  background-color: #f7f7f7;
  border: none;
}
.login-button {
  /*display: inline;*/
  width: 5rem;
  padding: 0.4rem;
  margin: 2rem auto 0 auto;
  border: 2px solid white;
}
.creat-new-task {
  width: 6rem;
  margin: 2rem auto 0 auto;
}
.download-button {
  margin: 3rem auto 1.5rem auto;
  width: 12rem;
}
.delete-button {
  margin: 0 auto 0 auto;
  width: 12rem;
}
</style>
