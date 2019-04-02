<template>
  <div class="navbar">
    <div :class="['side-trigger',{'active':sideStatus}]" @click="SET_SIDE_STATUS">
      <i class="el-icon-z-caidan"></i>
    </div>
    <el-breadcrumb>
      <transition-group name="breadcrumb">
        <template v-for="(item,index) in breadcrumbList">
          <el-breadcrumb-item
            v-if="item.redirect ||  index===breadcrumbList.length-1"
            :key="item.path"
          >
            <span :class="{'cur': index===breadcrumbList.length-1}">{{item.meta.title}}</span>
          </el-breadcrumb-item>
          <el-breadcrumb-item v-else :to="item.path" :key="item.path">{{item.meta.title}}</el-breadcrumb-item>
        </template>
      </transition-group>
    </el-breadcrumb>

    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <img
          src="../../../assets/images/login-bg.jpg"
          alt
        >
        <i class="el-icon-caret-bottom"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="resetPass">修改密码</el-dropdown-item>
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
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
  }
  img {
    display: block;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    margin-right: 6px;
  }
}
</style>