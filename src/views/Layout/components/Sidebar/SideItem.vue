<template>
  <div>
    <el-scrollbar style="height:100%">
      <!-- <div>
        <template v-for="item in alldata">
          <el-submenu
            v-if="hasChildren(item)"
            :index="item.id"
            :key="item.name"
          >
            <template slot="title">
              <router-link :to="{path:'categorization', query:{code:item.id}}" >
                <img src="/images/index/content.png">
                <span slot="title">{{item.name}}</span>
                <span class="number-badge">{{item.count}}</span>
              </router-link>
            </template>
            <template v-for="val in item.children">
              <side-item
                class="nest-menu"
                v-if="hasChildren(val)"
                :routes="[val]"
                :key="val.name"
              />
              <el-menu-item
                v-else
                :index="val.path"
                :key="val.path"
              >
            <img src="/images/index/icon1.png">
            <span slot="title">{{item.name}}</span>
            <span class="number-badge">{{item.count}}</span>
              </el-menu-item>
            </template>
          </el-submenu>
          <el-menu-item
            v-else
            :index="item.path"
            :key="item.path"
          >
          <router-link :to="{path:'categorization', query:{code:item.id}}" >
            <img src="/images/index/content.png">
            <span slot="title">{{item.name}}</span>
            <span class="number-badge">{{item.count}}</span>
          </router-link>
          </el-menu-item>
        </template>
      </div>   -->
      <el-menu>
        <el-submenu  v-for="(item,index) in alldata" :key="item.id" :index="item.id+item.name" class="level-nav" :class='{active:index == idx}'>   
              <template slot="title">
                <router-link :to="{path:'categorization', query:{code:item.id}}" >
                  <div @click="gotoDetail(item,index)">
                    <img src="/images/index/content.png">{{item.name}}<span class="number-badge">{{item.count}}</span>
                  </div>
                </router-link>
              </template>
            <NavItem :navList="item.children"></NavItem>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>
<script>
import {getAllTree, getTreeNumber,categoryDetail } from '@/api/index/index'
import NavItem from './Item';
export default {
  name: "sideItem",
  props: ["routes"],
  components: {
    NavItem
  },  
  data() {
    return {
      alldata:'',
      firstNav:'',
      idx:0,
    }
  },
  created(){
    this.initData();
  },
  methods: {
    hasChildren(route) {
      return route.children && route.children.length !== 0;
    },    
    async initData(){
      let resall = await getAllTree();
      this.alldata =  this.treeData(resall.data);   
      let params = 0;
    },
    async firstClick(index,item) {
      let res = await getTree(item.id);
      this.firstNav[index].children =  res;
      console.log(this.firstNav[0].children)
    },
    /**
     * 快速生成树形
     */
    treeData(data){
      let cloneData = JSON.parse(JSON.stringify(data))    // 对源数据深度克隆
      let tree = cloneData.filter(father=>{              //循环所有项
        let branchArr = cloneData.filter(child=>{
          return father.id == child.pId      //返回每一项的子级数组
        });
        if(branchArr.length>0){
          father.children = branchArr;    //如果存在子级，则给父级添加一个children属性，并赋值
        }
        return father.pId==0;      //返回第一层
      });
      return tree     //返回树形数据
    }, 
    async gotoDetail(item,index){
      this.idx = index;
    }
  }
};
</script>
<style lang="scss" scoped>
.el-submenu__title{
    img{
        margin-right: 8px;
        height: 15px;
    }
}
</style>