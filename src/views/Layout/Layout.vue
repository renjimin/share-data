<template>
  <div style="height:100%">
    <div class="app-body">
      <!-- 头部组建 -->
      <Header></Header>
      <div class="app-contains">
        <div class="app-wrapper">
          <sidebar></sidebar>
          <div class="app-scroll-wrap">
            <Search></Search>
            <div class="main-container">
              <app-main></app-main>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>

</template>
<script>
import Footer from '@/components/footer/footer'
import { Sidebar, Navbar, TagsNav, AppMain,Header,Search } from "./components";
export default {
  name: "layout",
  components: {
    Header,
    Footer,
    Sidebar,
    Navbar,
    TagsNav,
    AppMain,
    Search
  }
};
</script>
