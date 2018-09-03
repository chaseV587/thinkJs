<template>
  <div class="wrapper" append="tree">
    <div class="logo-wrap">
      <image src="../../../static/images/logo.png" class="logo">
    </div>
    <div class="form-wrap">
      <div>
        <text>用户名：</text>
        <input>
      </div>
      <div>
        <text>密码：</text>
        <input>
      </div>
      <div>
        <text>登录</text>
      </div>
    </div>
  </div>
</template>

<style>
  .wrapper { align-items: center; padding-top: 160px; }
  .title { font-size: 48px; margin-top: 50px; color: #004684}
  .logo-wrap{
    width: 750px;
    height: 400px;
    text-align: center;
    flex-direction: column;
  }
  .logo {
    width: 200px; 
    height: 200px;
    display: flex;
    margin: 0 275px;
  }
</style>

<script>
  export default {
    data: {
      target: 'LOGIN'
    }
  }
</script>
