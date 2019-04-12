<template>
  <div>
    <el-scrollbar style="height:100%">
      <el-menu>
        <el-submenu  v-for="item in alldata" :key="item.id" :index="item.id+item.name" class="level-nav">   
              <template slot="title">
                <router-link :to="{path:'categorization', query:{code:item.id}}" >
                  <div @click="gotoDetail(item)">
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
      firstNav:''
    }
  },
  created(){
    this.initData();
  },
  methods: {
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
    async gotoDetail(item){
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