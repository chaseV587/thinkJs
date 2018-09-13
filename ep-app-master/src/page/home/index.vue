<template>
  <div class="wrapper" append="tree">
    <!--头部-->
    <div class="header">
      <div class="header-flex header-site">
        <image src='../../static/image/icon-02.png' class="header-icon site-icon" ></image>
        <text class="header-site">上海</text>
      </div>
      <text class=" header-flex header-name">易停车</text>
      <div class="header-flex">
        <image src='../../static/image/icon-01.png' class="header-icon center-icon" ></image>
      </div>
    </div>
    <!--广告-->
    <div class="ad-wrap">
      <slider class="slider" interval="5000" auto-play="true">
        <div class="frame" v-for="img in adList" v-bind:key="img.name">
          <image class="ad1" resize="cover" :src="img.url"></image>
        </div>
      </slider>
    </div>
    <!--剩余车位-->
    <div class="count-carbarn">
      <text class="count-info">还剩余 40 个车位</text>
    </div>
    <!--中间菜单-->
    <div class="menu-wrap">
      <div class="menu-item fast-park">
        <image src='../../static/image/menu-01.png' class="menu-icon" ></image>
        <text class="menu-text">立即停车</text>
      </div>
      <div class="menu-item cur-park">
        <image src='../../static/image/menu-01.png' class="menu-icon" ></image>
        <text class="menu-text">实时车位</text>
      </div>
    </div>
    <div class="menu-wrap">
      <div class="menu-item  manage-park">
        <image src='../../static/image/menu-01.png' class="menu-icon" ></image>
        <text class="menu-text">车位管理</text>
      </div>
      <div class="menu-item order-center">
        <image src='../../static/image/menu-01.png' class="menu-icon" ></image>
        <text class="menu-text">订单中心</text>
      </div>
    </div>
  </div>
</template>

<style src='./index.css' />
<script>
  export default {
    data: function () {
      return {
        adList: [
          {
            name:'广告1',
            url: './static/image/ad-1.jpg'
          },
          {
            name:'广告2',
            url: './static/image/ad-2.jpg'
          }
        ]
      }
    },
    computed: {
    },
    methods:{
      init() {
      },
      // 登录
      loginAction() {
        this.errInfo = ''
        console.log(this)
        const username = this.username
        const password = this.password
        console.log(this.$store.state)
        if(username && password) {
          const param = {
            username,
            password
          }
          this.userLogin(param)
            .then((data) => {
              console.log(data)
            })
            .catch((res) =>{
              console.log(res)
              this.errInfo = res
            })
        }

      },
      registerAction() {
        this.jump('/register')
      }
    },
    created() {
      this.init()
      console.log('login.vue')
    },
  }
</script>
