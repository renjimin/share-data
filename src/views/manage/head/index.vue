<template>
  <div class="headerbar">
    <el-row type="flex">
      <el-col :span="3">
        <img src="/images/manage/head/logo1.png">
      </el-col>
      <el-col :span="19">数据资源共享后台管理系统</el-col>
      <el-col :span="3">
        <a @click="logout">
          <img src="/images/manage/head/icon-exit.png">
          <span>退出</span>
        </a>
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
    logout() {
      this.$router.push('/')
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
  height: 64px;
  line-height: 64px;
  background: url('/images/manage/head/top_bg.png');
  .logout{
    padding: 5px;
  }
  .el-row{
    .el-col-3{
      width: 210px;
    }
    .el-col-19{
      color: #ffffff;
      font-size: 24px;
      font-family: Arial, Times New Roman, 微软雅黑;
      font-weight: bold;
      height: 64px;
      line-height: 64px;
      margin-left: 16px;
    }
    .el-col-3{
      text-align: right;
      background: url('/images/manage/head/top_bg2.png') no-repeat;
      a{
        margin-right: 10px;
        color: #ffffff;
        text-decoration: none;
        img{
          vertical-align: middle;
        }
      }

    }
  }
  .el-col-2{
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
