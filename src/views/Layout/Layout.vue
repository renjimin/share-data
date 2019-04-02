<template>
  <div class="app-body">
    <!-- 头部组建 -->
    <Header></Header>
    <div class="app-contains">
      <div class="app-wrapper">
        <sidebar></sidebar>
        <div class="app-scroll-wrap">
          <Search></Search>
          <div class="main-container">
            <!-- <navbar></navbar> -->
            <!-- <tags-nav></tags-nav> -->
            <app-main></app-main>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Sidebar, Navbar, TagsNav, AppMain,Header,Search } from "./components";
export default {
  name: "layout",
  components: {
    Header,
    Sidebar,
    Navbar,
    TagsNav,
    AppMain,
    Search
  }
};
</script>