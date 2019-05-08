<template>
  <div class="seach-data">
    <el-input placeholder="请输入关键字进行搜索" v-model="searchvalue"
    @input="search"
    class="input-with-select">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
  </div>
</template>
<script>
import {searcher} from '@/api/index/index'
import Bus from '@/libs/bus'
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
      searchvalue:'',
      pageSize:4,
    }
  },
  methods:{
    async search(){
      let params ={
        searchKey:this.searchvalue || null,
        pageSize:this.pageSize,
        nowPage:1
      }
      sessionStorage.setItem('searchword',this.searchvalue);
      let res = await searcher(params);
      const { code } = res;
      if (code === '0') {
        Bus.$emit('head-search',res);
      }
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
