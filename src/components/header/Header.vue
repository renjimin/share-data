<template>
  <div class="headerbar">
    <el-row type="flex">
      <el-col :span="12">
        <img
          src="/images/head/top.png"
          alt
        >
      </el-col>
      <el-col :span="6"></el-col>
      <el-col :span="2" @click.native="backManagement">
        <i class="el-icon-setting"></i>
        <span>后台管理</span>
      </el-col>
      <el-col :span="2">
        <img src="/images/index/头像.png">
        <span>admin</span>
      </el-col>
      <el-col :span="2">
          <el-button plain size="mini" @click="logout">退出登录</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      breadcrumbList: []
    };
  },
  computed: {
    ...mapGetters(["sideStatus"])
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    ...mapMutations(["SET_SIDE_STATUS"]),
    ...mapActions("user", ["logoutAct"]),
    getBreadcrumb() {
      let matchedList = this.$route.matched;
      let firstRoute = matchedList[0];
      let homePage = [{ path: "/", meta: { title: "首页" } }];
      if (firstRoute && firstRoute.path) {
        matchedList = homePage.concat(matchedList);
      } else {
        matchedList = homePage;
      }
      this.breadcrumbList = matchedList;
    },
    handleCommand(command) {
      switch (command) {
        case "logout":
          this.logout();
          break;
        case "resetPass":
          this.resetPass();
          break;
      }
    },
    // 退出登录
    async logout() {
      await this.logoutAct();
      this.$router.push("/login");
    },
    // 重置密码
    async resetPass() {
      console.log("重置密码");
      await this.logoutAct();
      this.$router.push("/login/reset");
    },
    backManagement() {
      this.$router.push("/manage");
    }
  },
  watch: {
    $route(e) {
      this.getBreadcrumb();
    }
  }
};
</script>
<style lang='scss' scoped>
.headerbar{
  height: 60px;
  line-height: 60px;
  .logout{
    padding: 5px;
  }
  .el-col-2{
    cursor: pointer;
    color: #ffffff;
    img{
      height: 2rem;
      margin-right: 5px;
      vertical-align: middle;
    }
    .el-icon-setting{
      margin-right: 5px;
      font-size: 16px;
    }
    button{
      background-color: rgba(0, 0, 0, 0);
      color: #ffffff;
    }
  }
}
</style>
