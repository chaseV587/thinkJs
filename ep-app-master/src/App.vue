<template>
  <div class="app-wrapper" append="tree" @back='goBack' @error="errFunc">
    <transition>
      <router-view class="r-box"></router-view>
    </transition>
    <div class="loading-wrap" v-if='isShowLoading'>
      <wxc-loading :show="isShow" type="default" :loading-text='loadingText'></wxc-loading>
    </div>
  </div>
</template>

<style scoped>
  .app-wrapper{
    width: 720px;
  }
  .r-box{
    width: 720px;
  }
</style>

<script>
import mixins from './mixins/index.js';
Vue.mixin(mixins);
const meta = weex.requireModule('meta')
import { WxcLoading, WxcPartLoading } from 'weex-ui';
export default {
  components: { WxcLoading, WxcPartLoading },
  data: {
    isShow: true,
    loadingText: ''
  },
  computed: {
    // loading 监听
    isShowLoading() {
      const isShow = this.$store.state.app.isLoading
      this.loadingText = this.$store.state.app.loadingText
      return isShow
    }
  },
  methods: {
    goBack () {
      this.$router.back(-1)
    }
  },
  created() {
    meta.setViewport({
      width: 720
    })
    this.jump('/login')
  }
}
</script>