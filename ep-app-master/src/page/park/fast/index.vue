<template>
  <div class="wrapper" append="tree">
    <ums-header
      height="90px"
      fontSize="36px"
      backgroundColor="#38DCB7"
      @onLeftPartClick="leftClick"
      @onRightPartClick="rightClick"
      class="header"
      title="快速停车"
    >
    </ums-header>
    <div class="form-wrap">
      <div class="form-item form-status">
        <text class='item-text'>车位编号：</text>
        <div class="input-wrap">
          <input type="text" class="input-text" placeholder="请选择车位编号" v-model="parkInfo.park_no">
        </div>
        
        <div class="chose-status" @click="pickerParkNo()"></div>
      </div>
      <div class="form-item">
        <text class='item-text'>车位地址：</text>
        <div class="input-wrap">
          <input type="text" class="input-text" placeholder="请输入车位地址" v-model="parkInfo.address">
        </div>
      </div>
      <div class="form-item form-status"  >
        <text class='item-text'>车牌编号：</text>
        <div class="input-wrap">
          <input type="text" class="input-text" placeholder="请输入车牌号" v-model="parkInfo.cardNo" disabled='true' >
        </div>
      </div>
      <div class="form-item form-status"  >
        <text class='item-text'>联系号码：</text>
        <div class="input-wrap">
          <input type="text" class="input-text" placeholder="请联系号码" v-model="parkInfo.mobile" disabled='true' >
        </div>
        <div class="chose-status" @click="choseStatus('wxc-popover2')"></div>
      </div>
      <div class="form-item">
        <text class='item-text'>停车时间：</text>
        <div class="input-wrap">
          <input type="text" class="input-text" placeholder="请输入停车单价" v-model="parkInfo.time">
        </div>
      </div>
      <div class="form-item">
        <text class='item-text'>单价/小时：</text>
        <div class="input-wrap">
          <input type="text" class="input-text" placeholder="请输入停车单价" v-model="parkInfo.price">
        </div>
      </div>
      <div class="form-item">
        <text class='item-text'>应收款：</text>
        <div class="input-wrap">
          <input type="text" class="input-text" placeholder="请输入停车单价" v-model="parkInfo.totle">
        </div>
      </div>
      <div class="errInfo" >
        <text class="errInfo">{{errInfo}}</text>
      </div>
      <div>
        <text class="add-btn" @click='addAction'>确定新增</text>
      </div>
    </div>
    <wxc-dialog 
      title="提示"
      content="车位添加成功！"
      :show="show"
      :single="true"
      @wxcDialogConfirmBtnClicked="confirm">
    </wxc-dialog>
    <x-picker :type="pickerType"
      :show="showPicker"
      :dataset="parkListNo"
      :defaultTitle="defaultTitle"
      @overlayClick="pickerOverlayClick"
      @onchange="change" />
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
import { XPicker } from '../../../lib/component/weex-x-picker'
  export default {
    components:{
      UmsHeader,
      WxcCell,
      WxcPopover,
      WxcDialog,
      XPicker
    },
    data: function () {
      return {
        show: false,
        errInfo: '',
        parkInfo: {
          park_no: '',
          address: '',
          car_no: '',
          mobile: '',
          time: '',
          price:'',
          totle: '',
          pay_type: '',
        },
        parkList: [],
        parkListNo: [],
        park_no: '',
        city: '',
        address: '',
        park_status: '',
        park_status_text: '',
        price:'',
        // '车位状态编号：0-启用; 1-关闭; 2-维护',
        popoverPosition2: { x: 260, y: 120 },
        popoverArrowPosition2: { pos: 'top', x: 60 },
        pickerType: 'single',
        showPicker: false,
        defaultTitle : '地球'
      }
    },
    computed: {
    },
    methods:{
      leftClick() {
        this.$router.back(-1)
      },
      init() {
        // 初始化获取车位列表
        const user_id = this.$store.state.user.userId
        const param = {
          user_id
        }
        this.queryAllCarbarn(param)
          .then((data) => {
            const parkList = data.data
            this.parkList = parkList
            let param = {}
            const parkListNo = []
            parkList.forEach((item,index) => {
              console.log(item,index)
              param = {
                title: item.park_no,
                index: index
              }
              parkListNo.push(param)
            })
            console.log(parkListNo)
            this.parkListNo = parkListNo
          })
          .catch((res) =>{
            console.log(res)
            this.errInfo = res
          })
      },
      // 添加车位信息
      addAction() {
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
      },
      pickerParkNo() {
        this.showPicker = true
      },
      pickerOverlayClick (e) {
        this.showPicker = false
      },
      change (e) {
        const value = e.value
        const parkList = this.parkList
        /*
        parkInfo: {
          park_no: '',
          address: '',
          car_no: '',
          mobile: '',
          time: '',
          price:'',
          totle: '',
          pay_type: '',
        },
         */
        parkList.forEach((item,index) => {
          if (item.park_no === value) {
            this.parkInfo.park_no = value
            this.parkInfo.address = item.address
            this.parkInfo.price = item.price
          }
        })
        console.log(e)
      }
    },
    created() {
      this.init()
      console.log('login.vue')
    },
  }
</script>
  