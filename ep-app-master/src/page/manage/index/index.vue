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
    <div class="cell-wrap">
      <div class="cell-item" v-for="(item, index) in parkList" v-bind:key="item.park_id">
        <wxc-cell :label="index+1"
          :title="item.park_no"
          :has-arrow="true"
          @wxcCellClicked="edit(item.park_id)"
          :has-top-border="false"></wxc-cell>
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
.header-icon{
  width: 40px;
  height: 40px; 
  margin: 25px 25px;
}
  
</style>

<script>
import {UmsHeader} from 'ums-comp'
import { WxcCell } from 'weex-ui';
  export default {
    components:{
      UmsHeader,
      WxcCell
    },
    data: function () {
      return {
        parkList: [
          {
            park_id: '1234',
            park_no: 'ab123'
          },
          {
            park_id: '1234',
            park_no: 'ab123'
          }
        ]
      }
    },
    computed: {
    },
    methods:{
      init() {
      },
      edit(park_id) {
        console.log('park_id: '+park_id)
      },
      rightClick() {
        console.log('add---------------------------')
      }
    },
    created() {
      this.init()
      console.log('login.vue')
    },
  }
</script>
