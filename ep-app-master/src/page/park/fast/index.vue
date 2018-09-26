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
      <div class="form-item"  >
        <text class='item-text'>车牌编号：</text>
        <div class="input-wrap">
          <input type="text" class="input-text" placeholder="请输入车牌号" v-model="parkInfo.car_no" >
        </div>
      </div>
      <div class="form-item"  >
        <text class='item-text'>联系号码：</text>
        <div class="input-wrap">
          <input type="number" class="input-text" placeholder="请联系号码" v-model="parkInfo.mobile">
        </div>
      </div>
      <div class="form-item">
        <text class='item-text'>停车时间：</text>
        <div class="input-wrap">
          <input type="number" class="input-text" placeholder="请输入停车时长" v-model="parkInfo.count_time">
        </div>
      </div>
      <div class="form-item">
        <text class='item-text'>单价/小时：</text>
        <div class="input-wrap">
          <input type="number" class="input-text" placeholder="请输入停车单价" v-model="parkInfo.price">
        </div>
      </div>
      <div class="form-item" v-if="parkInfo.total">
        <text class='item-text'>应收款：</text>
        <div class="input-wrap">
          <input type="number" class="input-text" placeholder="请输入停车单价" v-model="parkInfo.total">
        </div>
      </div>
      <div class="errInfo" >
        <text class="errInfo">{{errInfo}}</text>
      </div>
      <div>
        <text class="add-btn" @click='addAction' v-if="displayButton === 1">确定停车</text>
        <text class="add-btn" @click='payAction' v-if="displayButton === 2">去支付</text>
        <text class="add-btn" @click='printAction' v-if="displayButton === 3">打印</text>
      </div>
    </div>
    <wxc-dialog 
      title="提示"
      content="停车成功！"
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
// import utils from 'utility'
import umsApi from 'ums-api'
import {UmsHeader} from 'ums-comp'
import { WxcCell, WxcPopover, WxcDialog } from 'weex-ui';
import { XPicker } from '../../../lib/component/weex-x-picker'
import print from '../../../lib/print/index.js';
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
        displayButton: 1, // 1 确定停车 2 支付
        show: false,
        errInfo: '',
        parkInfo: {
          park_id: '',
          park_no: '',
          address: '',
          car_no: '',
          mobile: '',
          count_time: '',
          price:'',
          total: '',
          pay_type: '',
          order_status: 0,
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
        this.parkInfo.user_id = user_id
        const param = {
          user_id
        }
        this.queryAllCarbarn(param)
          .then((data) => {
            const parkList = data.data
            debugger
            if (parkList.length === 0) {
              umsApi.modal.alert({
                  'title':'提示',
                  'message':'请先添加车位！',
                  'okButton':'确认'}, ret=> {
                      this.leftClick()
              })
            } else {
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
            }
          })
          .catch((res) =>{
            console.log(res)
            this.errInfo = res
          })
      },
      // 生成订单
      addAction() {
        this.errInfo = ''
        /*
        parkInfo: {
          park_no: '',
          address: '',
          car_no: '',
          mobile: '',
          count_time: '',
          price:'',
          totle: '',
          pay_type: '',
        },
         */
        const park_id = this.parkInfo.park_id
        const park_no = this.parkInfo.park_no
        const address = this.parkInfo.address
        const car_no = this.parkInfo.car_no
        const mobile = this.parkInfo.mobile
        const start_time = 'time';
        const count_time = this.parkInfo.count_time
        const price = this.parkInfo.price
        let total = ''
        if (price && count_time) {
          total = Number(price) * Number(count_time)
          this.parkInfo.total = total
          this.displayButton = 2
        }
        const order_no = new Date().getTime()
        this.parkInfo.order_no = order_no
        const order_status = 0 // 订单状态 0:未支付 1：已支付: 2: 欠款
        if (!park_no) {
          this.errInfo = '请输入车位编号'
          return
        } else if (!address) {
          this.errInfo = '请输入所在地址'
          return
        } else if (!car_no) {
          this.errInfo = '请输入车牌号'
          return
        } else if (!mobile) {
          this.errInfo = '请输入手机号码'
          return
        } else if (!price) {
          this.errInfo = '请输入单价'
          return
        }
        const param = {
          park_id,
          park_no,
          address,
          car_no,
          mobile,
          start_time,
          count_time,
          price,
          order_no,
          order_status,
          total
        }
        this.addOrder(param)
          .then((data) => {
            console.log(data)
            this.parkInfo.start_time = data.data.start_time
            this.displayButton = 2
          })
          .catch((res) =>{
            console.log(res)
            this.errInfo = res
          })
      },
      // 支付
      payAction() {
        this.displayButton = 4
        // 跳转智能桌面支付交易流程
        console.log('goPay callSale!')
        var param = {
            'amt': parseInt(this.accMul(this.parkInfo.total, 2))
        }
        umsApi.callCashier(param, ret=> {
          console.log(">>>Bing callCashier = " + ret)
          var data1 = JSON.parse(ret)
          if (data1.activityCode === -1) {
            var data = JSON.parse(data1.data)
            console.log('resultCode = ', data.resultCode)
            if (data.resultCode === '0') {
              if (data.transData.resCode === '00') {
                // 支付交易返回成功则更新数据库的交易状态和交易字段
                this.parkInfo.pay_type = data.appName
                this.parkInfo.order_status = 1
                const param = {
                  pay_type: this.parkInfo.pay_type,
                  order_no: this.parkInfo.order_no,
                  order_status: this.parkInfo.order_status,
                }
                this.payOrder(param)
                  .then((data) => {
                    console.log(data)
                    this.displayButton = 3
                    this.printAction()
                  })
                  .catch((res) =>{
                    console.log(res)
                    this.errInfo = res
                    this.displayButton = 2
                  })
              }
            }
          }
        })
      },
      // 打印
      printAction() {
        console.log(this.parkInfo)
        print.startPrint(this.parkInfo, res => {
          console.log(res)
          const result = JSON.parse(res)
          if(result.resultCode !== 0) {
              umsApi.modal.confirm({
                  'title':'提示',
                  'message':'打印失败，是否需要重新打印？',
                  'okButton':'确认',
                  'cancelButton':'取消'}, ret=> {
                      if (ret.result) {
                          this.rePrint()
                      } else {
                          // this.goBack()
                      }
              })
          } else {
              // this.goBack()
              umsApi.modal.alert({
                  'title':'提示',
                  'message':'订单支付成功',
                  'okButton':'确认'}, ret=> {
                      this.leftClick()
              })
          }
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
            this.parkInfo.park_id = item.park_id
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
  