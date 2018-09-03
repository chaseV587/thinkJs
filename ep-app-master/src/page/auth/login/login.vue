<template>
  <div class="wrapper" append="tree">
    <div class="logo">
      <image src="../../../static/images/logo.png" class="logo"></image>
      
    </div>
    <div class="">
      <cell>
        <text>用户名：</text>
        <input>
      </cell>
      <cell>
        <text>密码：</text>
        <input>
      </cell>
      <cell>
        <text>登录</text>
      </cell>
    </div>
  </div>
</template>

<style>
  .wrapper { align-items: center; padding-top: 180px; }
  .title { font-size: 48px; margin-top: 50px; color: #004684}
  .logo { width: 180px; height: 180px; }
</style>

<script>
  export default {
    data: {
      target: 'LOGIN'
    }
  }
</script>
