<template>
  <div class="admin_page">
    <div id="login_layer" v-if="!isLogin">
      <h2>管理员登录</h2>
      <h3>{{message}}</h3>
      <label>管理密码：</label>
      <input type="password" v-model.lazy="password" style="margin: 1rem 0">
      <button @click="login">登录</button>
    </div>
    <div id="admin_layer" v-if="isLogin">
      <div class="admin_view_layer">
        <h3>'{{message}}'</h3>
        <p>未上传名单：{{nameList}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminPage',
  data () {
    return {
      server:'http://localhost:8089/api/v1/',
      message: '欢迎',
      password: '',
      isLogin: false,
      nameList: '空'
    }
  },
  mounted() {
    if(document.cookie) {
      console.log('自动登录')
      this.login()
    }
  },
  methods: {
    login() {
      if(this.password === '') {
        this.message = '请输入密码'
      } else {
        //进入登录逻辑
        this.axios.post(this.server + 'login', {
          pw: this.password
        }).then (res => {
          if(res.data.status === 'success') {
            this.message = res.data.titleName + '收集情况'
            this.nameList = res.data.nameList + '，共 ' + res.data.nameList.length +' 人'
            this.isLogin = true
            console.log('登录成功')
          } else {
            this.message = '密码错误，请检查后重试'
          }
        }).catch(error => {
          console.log(error)
          this.message = '网络错误'
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.admin_page {
  width: 100%
}
</style>
