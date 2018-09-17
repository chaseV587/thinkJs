<template>
  <div class="wrapper" append="tree">
    <ums-header
      height="90px"
      fontSize="36px"
      backgroundColor="#38DCB7"
      @onLeftPartClick="leftClick"
      @onRightPartClick="rightClick"
      class="header"
      title="添加车位"
    >
    </ums-header>
    <div class="form-wrap">
      <div class="form-item">
        <text class='item-text'>车位编号：</text>
        <div class="input-wrap">
          <input type="text" class="input-text" placeholder="请输入车位编号" v-model="username">
        </div>
      </div>
      <div class="form-item">
        <text class='item-text'>城        市：</text>
        <div class="input-wrap">
          <input type="text" class="input-text" placeholder="请输入城市" v-model="city">
        </div>
      </div>
      <div class="form-item">
        <text class='item-text'>地        址：</text>
        <div class="input-wrap">
          <input type="text" class="input-text" placeholder="请输入地址" v-model="address">
        </div>
      </div>
      <div class="form-item form-status"  >
        <text class='item-text'>车位状态：</text>
        <div class="input-wrap">
          <input type="text" class="input-text" placeholder="请选择停车状态" v-model="nickname" disabled='true' >
        </div>
        <div class="chose-status" @click="choseStatus('wxc-popover2')"></div>
        
    <wxc-popover 
      ref="wxc-popover2"
      :buttons="btns2"
      :position="popoverPosition2"
      :arrowPosition="popoverArrowPosition2"
      @wxcPopoverButtonClicked="popoverButtonClicked"
    ></wxc-popover>
      </div>
      <div class="form-item">
        <text class='item-text'>单价/小时：</text>
        <div class="input-wrap">
          <input type="text" class="input-text" placeholder="请输入停车单价" v-model="mobile">
        </div>
      </div>
      <div>
        <text class="login-btn" @click='registerAction'>确定新增</text>
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
.form-wrap{
    width: 720px;
    margin: 10px 10px;
  }
  .form-item{
    width: 700px;
    line-height: 100px;
    height: 100px;
    flex-direction: row;
    font-size: 40px;
    border-bottom-width: 1px ;
    border-color: #aaa;
    border-style: solid;
  }
  .form-statu{
    position: relative;
  }
  .chose-status{
    position: absolute;
    width: 700px;
    height: 100px;
    z-index: 10;
    left: 0;
    top: 0;
  }
  .item-text{
    width: 230px;
    line-height: 100px;
    text-align: right;
    padding-right: 40px;
    color: #444;
  }
  .input-wrap{
    width: 460px;
    font-size: 35px;
    height: 100px;
  }
  .input-text{
    width: 460px;
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
import {UmsHeader} from 'ums-comp'
import { WxcCell, WxcPopover } from 'weex-ui';
  export default {
    components:{
      UmsHeader,
      WxcCell,
      WxcPopover
    },
    data: function () {
      return {
        city: '',
        address: '',
        btns: [
          {
            icon: '',
            text: 'Scan',
            key: 'key-scan'
          },
          {
            icon: '',
            text: 'My Qrcode',
            key: 'key-qrcode'
          },
          {
            icon: '',
            text: 'Help',
            key: 'key-help'
          }
        ],
        popoverPosition:{x:-14,y:380},
        popoverArrowPosition:{pos:'top',x:-15}
      }
    },
    computed: {
    },
    methods:{
      init() {
        // 自动获取当前地址
        const info = umsApi.getDeviceInfo()
        if(info.Location) {
          this.city = info.Location.City
          const address = info.Location.Address
          const newAddress = address.split(this.city)
          this.address = newAddress[1]
        }
      },
      edit(park_id) {
        console.log('park_id: '+park_id)
      },
      rightClick() {
        console.log('add---------------------------')
      },
      choseStatus(ref='wxc-popover2') {
        console.log('1111111111111')
        this.$refs[ref].wxcPopoverShow();
      }
    },
    created() {
      this.init()
      console.log('login.vue')
    },
  }
</script>
