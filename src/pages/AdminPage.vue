<template>
  <div class="admin_page">
    <div class="login_layer" v-if="!isLogin">
      <h2>管理员登录</h2>
      <h3>{{message}}</h3>
      <label style="font-size: 1.2rem">管理密码：</label>
      <input type="password" v-model.lazy="password" @keyup.enter="login" class="input-text">
      <div role="button" class="button login-button" @click="login">登录</div>
    </div>
    <div class="admin_layer" v-if="isLogin">
      <template v-if="!haveAnyTask">
        <h2>当前没有收集任务</h2>
        <h3>新建一个吧</h3>
        <div role="button" class="button" @click="login">新建任务</div>
      </template>
      <template v-if="haveAnyTask">
        <div class="admin_view_layer">
          <h2>"{{taskName}}" 收集情况</h2>
          <h3>{{message}}</h3>
          <label>本次任务名：</label>
          <input v-model.lazy="taskName" style="margin: 0.5rem 0"><br>
          <label>新命名格式：</label>
          <input v-model.lazy="namingRules" style="margin: 0.5rem 0"><br>
          <label>删除当前收集的文件</label>
          <input type="checkbox" v-model="deleteFiles"><br>
          <span v-show="!deleteFiles">勾选后会删除服务器端当前的文件</span>
          <span v-show="deleteFiles">删除后服务器端文件将无法恢复</span>
          <p style="color: grey">命名格式支持 姓名、学号、身份证号、任务名 四种模板；命名模板之间可以用任何可作为文件名使用的符号连接（例如空格）</p>
          <button @click="updateTask">修改任务名及命名格式</button>
          <p>未上传名单：{{nameList}}</p>
          <h3>目前收集到的所有文件</h3>
          <button>下载所有</button>
          <p>服务器端文件将在最后一次下载后12小时内自动删除，请妥善保存文件</p>
        </div>
      </template>
      <button @click="clearAllCookie">退出登录状态</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPage',
  data () {
    return {
      haveToken: false,
      haveAnyTask: false,
      message: '欢迎',
      taskName:'文件',
      namingRules:'姓名 学号',
      deleteFiles: false,
      password: '',
      isLogin: false,
      nameList: '空'
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
            this.isLogin = true
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
      alert('下次该输密码重新登录噜')
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
            withCredentials: true
          }).then(res => {
            if (res.data.status === 'success') {
              this.message = '修改成功'
              this.deleteFiles = false
            } else {
              switch (res.data.message) {
                case 'invalid namingRules':
                  this.message = '使用了不支持的命名规则'
                      break
                case 'empty':
                  this.message = '太怪了，服务器说有东西空下没填'
                      break
                default:
                  this.message = '未知错误，请联系管理员'
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
    downloadFile() {
      this.message = '文件正在服务器端打包，下载将在稍后开始，请稍等'
      // todo 下载当前任务文件
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
</style>
