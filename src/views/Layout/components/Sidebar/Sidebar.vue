<template>
  <el-menu
    router
    :collapse="sideStatus"
    :default-active="$route.path"
  >
  <side-item :routes="$router.options.routes" />
  </el-menu>
</template>
<script>
import { mapGetters } from "vuex";
import SideItem from "./SideItem";

export default {
  name: "sidebar",
  components: {
    SideItem
  },
  created(){

  },
  computed: {
    ...mapGetters(["sideStatus"])
  }
};
</script>
