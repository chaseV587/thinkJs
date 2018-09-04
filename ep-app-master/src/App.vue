<template>
  <div class="app-wrapper" append="tree" @back='goBack' @error="errFunc">
    <transition>
      <router-view class="r-box"></router-view>
    </transition>
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
export default {
  data: {
  },
  components: {
  },
  computed: {
  },
  methods: {
  },
  created() {
    meta.setViewport({
      width: 720
    })
    this.jump('/login')
  }
}
</script>