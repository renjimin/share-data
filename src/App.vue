<template>
  <div
    id="app"
    append-to-body
    v-loading.fullscreen.lock="globalLoading"
    :element-loading-text="loadingMessage"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
  >
    <transition v-if="isAni" name="page">
      <router-view/>
    </transition>
    <router-view v-else/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "app",
  computed: {
    ...mapGetters(["globalLoading", "loadingMessage", "isAni"])
  }
};
</script>
<style lang="scss" scoped>
.page-enter-active,
.page-leave-active {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.page-enter-active {
  z-index: 2;
  transition: all 0.5s;
}
.page-leave-active {
  transition: all 0.8s;
  z-index: 22;
}
.page-enter {
  transform: scale(1.1);
}

.page-leave-to {
  opacity: 0;
  transform-origin: left bottom;
  transform: translateX(-20%) scale(0.1);
}
</style>


