<template>
  <div class="app-wrapper" append="tree" @back='goBack' @error="errFunc">
    <transition>
      <router-view class="r-box"></router-view>
    </transition>
  </div>
</template>

<style scoped>
  .app-wrapper{
    background-color: #f4f4f4;
  }
  .r-box{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>

<script>
import mixins from './mixins/index.js';
Vue.mixin(mixins);
export default {
  data: {
  },
  methods: {
    errFunc (ret) {
      // umsApi.storage.setItem('errorData', ret)  //存储错误信息，以便在error.js内取出处理
    },
    goBack () {
      // console.log('App paths:', this.$store.state.paths)
      // // 商品信息页面跳转过来的时候，直接返回到商品列表页面
      // if (this.$store.state.paths[1] === '/goods-info') {
      //   this.$store.commit('deletePaths')
      // }
      // this.back()
      // umsApi.navigator.pop()
    },
  },
  created() {
    //this.$store.commit('addPaths', '/')   //path统一由上级页面加，'/'自己加
    debugger
    this.jump('/login')
  }
}
</script>
