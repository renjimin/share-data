<template>
  <div class="manage-body">
    <Head></Head>
    <MainNavbar />
    <MainContent />
  </div>
</template>
<script>
import  Head  from "./head/index";
import  MainNavbar  from "./navbar/main-sidebar-sub-menu";
import  MainContent  from "./breadcrumb/index";
export default {
  name: "ManageHead",
  components: {
    Head,
    MainNavbar,
    MainContent
  }
};
</script>
<style lang="scss">
.manage-body{
  background-color: #E9EAEE;
}
</style>

