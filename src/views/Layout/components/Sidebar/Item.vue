<template>
   <div>
        <label v-for="(item,index) in navList" :key="index" @click="getCateDetail(item)">
            <router-link :to="{path:'categorization', query:{code:item.id}}" >
                <el-submenu  :key="item.name +item.id" :index="item.name">
                    <!-- <el-menu-item>{{ item.name }}</el-menu-item> -->
                    <template slot="title">
                        <img src="/images/index/icon1.png">
                        <span slot="title">{{ item.name }}</span>
                        <span class="number-badge">{{item.count}}</span>
                    </template> 
                    <!-- <el-menu-item index="1-4-1">选项1</el-menu-item> -->
                    <!-- 递归组件 -->
                    <NavItem :navList="item.children"></NavItem>
                </el-submenu>
            </router-link>
        </label>
    </div>
</template>

<script>
import { getTreeNumber ,categoryDetail} from '@/api/index/index'
export default {
  name: 'NavItem',
  props:['navList'],
  methods:{
      async getCateDetail(item){
          console.log('item',item.children)
          if (!item.children) {
            let data = {
                "code": item.Id,
                "nowPage": 1,
                "pageSize": 10,              
            }
            let resdetail  =  await categoryDetail(data);
            const {code } = resdetail;
            if (code === ! 0) {
                this.$router.push({name:'routes',params:{pk_refinfo:'test',value:'test1'}});
            }
          }
        //   if (!item.children){
        //       let res  =  await getTreeNumber();
        //   }

      }
  },
  mounted() {

  }
};
</script>

<style lang="scss" scoped>
.el-submenu__title{
    img{
        margin-right: 8px;
        height: 7px;
    }
}
</style>