<template>
  <div class="tags-nav">
    <div class="btn-con">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div class="scroll-outer">
      <transition-group name="breadcrumb">
        <router-link
          tag="div"
          :class="['item',{'active':isActive(item)}]"
          :to="item.path"
          v-for="item in tagsList"
          :key="item.name"
        >
          <span class="left-dot"></span>
          <span class="text">{{item.title}}</span>
          <div
            @click.stop="closeSelectedTag(item.name)"
            v-if="item.name != 'dashboard'"
            class="close-tag"
          >
            <i class="el-icon-close"></i>
          </div>
        </router-link>
      </transition-group>
    </div>
    <div class="btn-con right-btn">
      <i class="el-icon-arrow-right"></i>
    </div>
    <el-dropdown
      class="close-con"
      @command="handleCommand"
    >
      <div>
        <i class='el-icon-circle-close-outline'></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="closeSelectedTag">关闭当前</el-dropdown-item>
        <el-dropdown-item command="closeOthersTags">关闭其他</el-dropdown-item>
        <el-dropdown-item command="closeAllTags">关闭全部</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import { getTagsFormSessionStorage } from "@/libs/utils";
export default {
  name: "tagsNav",
  created() {
    this.getHomePage(this.$router.options.routes);
  },
  computed: {
    ...mapGetters(["tagsList"])
  },
  watch: {
    $route() {
      this.addTagsNav();
    }
  },
  methods: {
    ...mapMutations(["ADD_TAG", "SET_HOME_PAGE_ROUTE", "INIT_TAG"]),
    ...mapActions(["delCurTagAct", "delAllAct", "delOthersTagAct"]),
    addTagsNav() {
      this.ADD_TAG(this.$route);
    },
    isActive(route) {
      return route.path === this.$route.path;
    },
    // 获取首页,数据初始化
    getHomePage(routes) {
      routes.some(item => {
        if (item.meta && item.meta.homePage) {
          this.SET_HOME_PAGE_ROUTE({
            name: item.name,
            path: item.path,
            title: item.meta.title,
            noCache: item.meta.noCache || false
          });
          getTagsFormSessionStorage().then(res => {
            if (res) {
              this.INIT_TAG(res);
              this.addTagsNav();
            } else {
              this.addTagsNav();
            }
          });
          return true;
        } else {
          if (item.children) {
            this.getHomePage(item.children);
          }
        }
      });
    },
    handleCommand(command) {
      switch (command) {
        case "closeSelectedTag":
          this.closeSelectedTag();
          break;
        case "closeOthersTags":
          this.delOthersTagAct(this.$route);
          break;
        default:
          this.delAllAct().then(route => this.$router.push(route));
      }
    },
    // 关闭当前
    closeSelectedTag(routeName) {
      if (routeName && this.routeIsHome(routeName)) return;
      if (!routeName && this.routeIsHome(this.$route.name)) return;
      if (routeName) {
        // 删除的是当前激活的路由，需要重新跳转到最后
        if (routeName === this.$route.name) {
          this.delCurTagAct(routeName).then(lastRoutePath => {
            this.$router.push(lastRoutePath);
          });
        } else {
          this.delCurTagAct(routeName);
        }
      } else {
        this.delCurTagAct(this.$route.name).then(lastRoutePath => {
          this.$router.push(lastRoutePath);
        });
      }
    },
    routeIsHome(routeName) {
      return routeName === "home";
    }
  }
};
</script>