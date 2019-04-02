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
    console.log(this.$router.options.routes)
  },
  computed: {
    ...mapGetters(["sideStatus"])
  }
};
</script>
