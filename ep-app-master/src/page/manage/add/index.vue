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
          <input type="text" class="input-text" placeholder="请输入车位编号" v-model="park_no">
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
          <input type="text" class="input-text" placeholder="请选择停车状态" v-model="park_status_text" disabled='true' >
        </div>
        <div class="chose-status" @click="choseStatus('wxc-popover2')"></div>
      </div>
      <div class="form-item">
        <text class='item-text'>单价/小时：</text>
        <div class="input-wrap">
          <input type="number" class="input-text" placeholder="请输入停车单价" v-model="price">
        </div>
      </div>
      <div class="errInfo" >
        <text class="errInfo">{{errInfo}}</text>
      </div>
      <div>
        <text class="add-btn" @click='addAction'>确定新增</text>
      </div>
    </div>
    <wxc-popover ref="wxc-popover2"
      :buttons="btns2"
      :position="popoverPosition2"
      :arrowPosition="popoverArrowPosition2"
      @wxcPopoverButtonClicked="popoverButtonClicked"
    ></wxc-popover>
    <wxc-dialog 
      title="提示"
      content="车位添加成功！"
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
  .add-btn{
    width: 320px;
    text-align: center;
    color: #fff;
    height: 80px;
    line-height: 80px;
    border-radius: 10px;
    background-color: #38DCB7; 
    margin: 270px 190px 50px;
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
    width: 700px;
    text-align: center;
    padding-top: 15px;
  }
  
</style>

<script>
import umsApi from 'ums-api'
import {UmsHeader} from 'ums-comp'
import { WxcCell, WxcPopover, WxcDialog } from 'weex-ui';
const modal = weex.requireModule('modal');
  export default {
    components:{
      UmsHeader,
      WxcCell,
      WxcPopover,
      WxcDialog
    },
    data: function () {
      return {
        show: false,
        errInfo: '',
        park_no: '',
        city: '',
        address: '',
        park_status: '',
        park_status_text: '',
        price:'',
        // '车位状态编号：0-启用; 1-关闭; 2-维护',
        btns2: [
          {
            text: '启用',
            key: 0
          },
          {
            text: '关闭',
            key: 1
          },
          {
            text: '维护',
            key: 2
          }
        ],
        popoverPosition2: { x: 200, y: 520 },
        popoverArrowPosition2: { pos: 'top', x: 60 },
      }
    },
    computed: {
    },
    methods:{
      leftClick() {
        this.$router.back(-1)
      },
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
      // 选择停车状态 弹窗
      choseStatus(ref='wxc-popover2') {
        console.log('1111111111111')
        this.$refs[ref].wxcPopoverShow();
      },
      // 选择停车状态 
      popoverButtonClicked (obj) {
        console.log(obj)
        const park_status = obj.key
        this.park_status = park_status
        if(park_status === 0) {
          this.park_status_text = '启用'
        } else if (park_status === 1) {
          this.park_status_text = '关闭'
        } else if (park_status === 2) {
          this.park_status_text = '维护'
        }
      },
      // 添加车位信息
      addAction() {
        debugger
        this.errInfo = ''
        const park_no = this.park_no
        const city =  this.city
        const address = this.address
        let park_status = this.park_status
        park_status = park_status.toString()
        const price = this.price
        if (!park_no) {
          this.errInfo = '请输入车位编号'
          return
        } else if (!city) {
          this.errInfo = '请输入所在城市'
          return
        } else if (!address) {
          this.errInfo = '请输入所在地址'
          return
        } else if (!park_status) {
          this.errInfo = '请输入车位状态'
          return
        } else if (!price) {
          this.errInfo = '请输入停车单价'
          return
        }
        const user_id = this.$store.state.user.userId
        const param = {
          user_id,
          park_no,
          city,
          address,
          park_status,
          price,
        }
        this.addCarbarn(param)
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
        // this.jump('/home')
        this.$router.back(-1)
      }
    },
    created() {
      this.init()
      console.log('login.vue')
    },
  }
</script>
