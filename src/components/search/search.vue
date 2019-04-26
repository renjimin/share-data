<template>
  <div class="seach-data">
    <el-input placeholder="请输入关键字进行搜索" v-model="input5" class="input-with-select">
      <i slot="prefix" class="el-input__icon el-icon-search" @click="search"></i>
    </el-input>
  </div>
</template>
<script>
import {searcher} from '@/api/index/index'
export default {
  name: "Empty",
  props: {
    ptop: {
      type: String,
      default: "40%"
    }
  },
  data() {
    return {
      input5:'',
      pageSize:4,
    }
  },
  methods:{
    async search(){
      let data ={
        code:'',
        scale:'',
        region:'',
        redLine:'',
        pageSize:this.pageSize,
        nowPage:1
      }
      let res = await searcher(data);
    }
  }
};
</script>
<style lang='scss'>
.seach-data {
    padding:10px;
    color:#fff;
    position: relative;
    left:20%;
    width: 50%;

    // transform:translate(0%,-50%);
    .input-with-select{
      border-radius: 50px;
    }
    .el-input__inner{
      border-radius: 50px;
    }
    .el-input__prefix{
      left: calc(100% - 30px);
    }
}
</style>
