<template>
  <div>
    <Row :gutter="20">
      <i-col span="6" v-for="(infor, i) in inforCardData" :key="`infor-${i}`" style="height: 120px;">
        <infor-card shadow :color="infor.color" :icon="infor.icon" :icon-size="36">
          <count-to :end="infor.count" count-class="count-style"/>
          <p>{{ infor.title }}</p>
        </infor-card>
      </i-col>
    </Row>
    <Row :gutter="20" style="margin-top: 20px;">
      <i-col span="8">
        <Card shadow>
          <chart-pie style="height: 300px;" :value="pieData" text="本月各地区停车数量"></chart-pie>
        </Card>
      </i-col>
      <i-col span="16">
        <Card shadow>
          <chart-bar style="height: 300px;" :value="barData" text="本周停车数量"/>
        </Card>
      </i-col>
    </Row>
    <!--
    <Row style="margin-top: 20px;">
      <Card shadow>
        <example style="height: 310px;"/>
      </Card>
    </Row>-->
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import { ChartPie, ChartBar } from '_c/charts'
import Example from './example.vue'
export default {
  name: 'home',
  components: {
    InforCard,
    CountTo,
    ChartPie,
    ChartBar,
    Example
  },
  data () {
    return {
      inforCardData: [
        { title: '新增用户', icon: 'md-person-add', count: 803, color: '#2d8cf0' },
        { title: '车位数量', icon: 'md-locate', count: 23432, color: '#19be6b' },
        { title: '收费金额', icon: 'md-help-circle', count: 142, color: '#ff9900' },
        { title: '停车数量', icon: 'md-share', count: 657, color: '#ed3f14' }
      ],
      pieData: [
        { value: 335, name: '浦东' },
        { value: 310, name: '闵行' },
        { value: 234, name: '徐汇' },
        { value: 135, name: '黄埔' },
        { value: 548, name: '长宁' }
      ],
      barData: {
        Mon: 13253,
        Tue: 34235,
        Wed: 26321,
        Thu: 12340,
        Fri: 24643,
        Sat: 1322,
        Sun: 1324
      }
    }
  },
  mounted () {
    //
  }
}
</script>

<style lang="less">
.count-style{
  font-size: 50px;
}
</style>
