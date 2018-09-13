<template>
  <div class="wrapper" append="tree">
    <ums-header
      height="90px"
      fontSize="36px"
      backgroundColor="#38DCB7"
      @onLeftPartClick="leftClick"
      @onRightPartClick="rightClick"
      class="header"
      title="车位管理"
    >
    <image slot="right" class="header-icon site-icon"  src='../../../static/image/icon-03.png'></image>
    </ums-header>
    
    
  </div>
</template>

<style>
.wrapper { 
  width: 720px;
  background-color: #fefefe; 
  flex-direction: column;
}
.header-icon{
  width: 40px;
  height: 40px; 
  margin: 25px 25px;
}
  
</style>

<script>
import {UmsHeader} from 'ums-comp'
  export default {
    components:{
      UmsHeader
    },
    data: function () {
      return {
        errInfo: '',
        username: 'test',
        password: '123456'
      }
    },
    computed: {
    },
    methods:{
      init() {
      },
      
    },
    created() {
      this.init()
      console.log('login.vue')
    },
  }
</script>
