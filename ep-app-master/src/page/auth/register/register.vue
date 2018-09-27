<template>
  <div class="wrapper" append="tree">
    <div class="logo-wrap">
      <image src='../../../static/image/logo.png' class="logo" ></image>
    </div>
    <div class="form-wrap">
      <div class="form-item">
        <text class='item-text'>用  户  名：</text>
        <div class="input-wrap">
          <input type="text" class="input-text" placeholder="请输入用户名" v-model="username">
        </div>
      </div>
      <div class="form-item">
        <text class='item-text'>密        码：</text>
        <div class="input-wrap">
          <input type="password" class="input-text" placeholder="请输入密码" v-model="password">
        </div>
      </div>
      <div class="form-item">
        <text class='item-text'>确认密码：</text>
        <div class="input-wrap">
          <input type="password" class="input-text" placeholder="请再输入一次密码" v-model="password2">
        </div>
      </div>
      <div class="form-item">
        <text class='item-text'>昵        称：</text>
        <div class="input-wrap">
          <input type="text" class="input-text" placeholder="请输入昵称" v-model="nickname">
        </div>
      </div>
      <div class="form-item">
        <text class='item-text'>手机号码：</text>
        <div class="input-wrap">
          <input type="text" class="input-text" placeholder="请输入手机号码" v-model="mobile">
        </div>
      </div>
      <div class="errInfo" >
        <text class="errInfo">{{errInfo}}</text>
      </div>
      <div>
        <text class="login-btn" @click='registerAction'>注 册</text>
      </div>
    </div>
    <wxc-dialog 
      title="提示"
      content="注册成功"
      :show="show"
      :single="true"
      @wxcDialogConfirmBtnClicked="confirm">
    </wxc-dialog>
  </div>
</template>

<style>
  .wrapper { 
    width: 720px;
    background-color: #fefefe; 
    flex-direction: column;
  }
  .logo-wrap{
    width: 720px;
    height: 400px;
  }
  .logo {
   width: 240px; 
   height: 240px; 
   margin: 120px 240px 80px;
  }
  .form-wrap{
    width: 600px;
    margin: 20px 60px;
  }
  .form-item{
    width: 600px;
    line-height: 100px;
    height: 100px;
    flex-direction: row;
    font-size: 40px;
    border-bottom-width: 1px ;
    border-color: #aaa;
    border-style: solid;
  }
  .item-text{
    width: 200px;
    line-height: 100px;
    text-align: right;
    padding-right: 40px;
    color: #444;
  }
  .input-wrap{
    width: 360px;
    font-size: 35px;
    height: 100px;
  }
  .input-text{
    width: 360px;
    padding: 20px;
    font-size: 35px;
    height: 100px;
    color: #444;
  }
  .login-btn{
    width: 320px;
    text-align: center;
    color: #fff;
    height: 80px;
    line-height: 80px;
    border-radius: 10px;
    background-color: #38DCB7; 
    margin: 70px 140px 50px;
  }
  .tip-wrap{
    flex-direction: row;
    width: 300px;
    margin: 140px 140px 0;
  }
  .tip-text{
    flex:1;
    width: 150px;
    display: inline-block;
    text-align: center;
    color: #666;
  }
  .errInfo{
    color: #e44359;
    width: 600px;
    text-align: center;
    padding-top: 15px;
  }
</style>

<script>
import umsApi from 'ums-api'
import { WxcDialog } from 'weex-ui';
  export default {
    components: { WxcDialog },
    data: function () {
      return {
        show: false,
        errInfo: '',
        username: '',
        password: '',
        password2: '',
        nickname: '',
        mobile: '',
        pos_sn: '',
      }
    },
    computed: {
    },
    methods:{
      init() {
        const info = umsApi.getDeviceInfo()
        this.pos_sn = info.SN
      },
      // 注册
      registerAction() {
        this.errInfo = ''
        console.log(this)
        const username = this.username
        const password = this.password
        const password2 = this.password2
        const nickname = this.nickname
        const mobile = this.mobile
        if (!username) {
          this.errInfo = '请输入用户名'
          return
        } else if (!password && !password2) {
          this.errInfo = '请输入密码'
          return
        } else if (password != password2) {
          this.errInfo = '密码不一致,请确认'
          return
        } else if (!nickname) {
          this.errInfo = '请输入昵称'
          return
        } else if (!mobile) {
          this.errInfo = '请输入手机号码'
          return
        }
        const param = {
          username,
          password,
          nickname,
          mobile,
          pos_sn: this.pos_sn,
        }
        console.log(param)
        this.userRegister(param)
            .then((data) => {
              console.log(data)
              this.show = true;
              // this.jump('/login')
            })
            .catch((res) =>{
              console.log(res)
              this.errInfo = res
            })
      },
      confirm(e) {
        this.show = false;
        // this.jump('/login')
        this.$router.back(-1)
      }
    },
    created() {
      this.init()
      console.log('register.vue')
    },
  }
</script>
