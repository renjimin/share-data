<template>
  <div class="headerbar">
    <el-row type="flex">
      <el-col :span="12">
        <img
          src="../../../assets/images/top.png"
          alt
        >
      </el-col>
      <el-col :span="12"></el-col>
      <el-col :span="2">
        <i class="el-icon-setting">后台管理</i>
        <!-- <div>后台管理</div> -->
      </el-col>      
      <el-col :span="2">
        <!-- <div>
          <span class="el-dropdown-link">
            <img
              src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3303741086,3211617265&fm=27&gp=0.jpg"
              alt
            >
            <i class="el-icon-caret-bottom"></i>
          </span>          
        </div> -->
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <img
              src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3303741086,3211617265&fm=27&gp=0.jpg"
              alt
            >
            <i class="el-icon-caret-bottom">admin</i>
            <!-- <span>admin</span> -->
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="resetPass">修改密码</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="2">
          <el-button plain>退出登录</el-button>
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
    }
  },
  watch: {
    $route(e) {
      this.getBreadcrumb();
    }
  }
};
</script>


<style>
.header-bar .el-breadcrumb__inner.is-link {
  font-weight: 400;
  color: #606266;
}
.header-bar .el-breadcrumb__inner.is-link:hover {
  color: #409eff;
}
</style>

<style lang='scss' scoped>
.headerbar{
  .logout{
    padding: 5px;
  }
}

.el-breadcrumb {
  flex: 1;
}
.el-dropdown {
  height: 100%;
  .el-dropdown-link {
    height: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
    outline: none;
    img {
      display: block;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-right: 6px;
    }    
  }
}
</style>