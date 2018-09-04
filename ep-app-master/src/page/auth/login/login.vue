<template>
  <div class="wrapper" append="tree">
    <div class="logo-wrap">
      <image src='../../../static/image/logo.png' class="logo"></image>
    </div>
    <div class="form-wrap">
      <div class="form-item">
        <text class='item-text'>用户名：</text>
        <div class="input-wrap">
          <input type="text" class="input-text" placeholder="请输入用户名">
        </div>
      </div>
      <div class="form-item">
        <text class='item-text'>密    码：</text>
        <div class="input-wrap">
          <input type="text" class="input-text" placeholder="请输入密码">
        </div>
      </div>
      <div>
        <text class="login-btn">登录</text>
      </div>
      <div class="tip-wrap">
        <text class='tip-text'>注册</text>
        <text class='tip-text'>忘记密码</text>
      </div>
    </div>
    
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
    height: 600px;
  }
  .logo {
   width: 240px; 
   height: 240px; 
   margin: 230px 240px 130px;
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
    margin: 160px 140px 0;
  }
  .tip-text{
    flex:1;
    width: 150px;
    display: inline-block;
    text-align: center;
    color: #666;
  }
</style>

<script>
  export default {
    data: {
      target: 'LOGIN',
    },
    created() {
      console.log('login.vue')
    },
  }
</script>
