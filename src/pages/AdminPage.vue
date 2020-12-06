<template>
  <div class="admin_page">
    <div id="login_layer" v-if="!isLogin">
      <h2>管理员登录</h2>
      <h3>{{message}}</h3>
      <label>管理密码：</label>
      <input type="password" v-model.lazy="password" @keyup.enter="login" style="margin: 1rem 0">
      <button @click="login">登录</button>
    </div>
    <div id="admin_layer" v-if="isLogin">
      <div class="admin_view_layer">
        <h2>"{{taskName}}" 收集情况</h2>
        <h3>{{message}}</h3>
        <label>修改任务名：</label>
        <input v-model.lazy="taskName" style="margin: 0.5rem 0">
        <button>修改</button>
        <p>未上传名单：{{nameList}}</p>
        <h3>目前收集到的所有文件</h3>
        <button>下载所有</button>
        <p>服务器端文件将在最后一次下载后12小时内自动删除，请妥善保存文件</p>
        <button @click="clearAllCookie">退出登录状态</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPage',
  data () {
    return {
      haveToken: false,
      message: '欢迎',
      taskName:'文件',
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
            this.taskName = res.data.titleName
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
    }
  },
  updateTask() {
    this.message = ''
    // todo 更新任务名称
  },
  downloadFile() {
    this.message = '文件正在服务器端打包，下载将在稍后开始，请稍等'
    // todo 下载当前任务文件
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.admin_page {
  width: 100%
}
</style>
