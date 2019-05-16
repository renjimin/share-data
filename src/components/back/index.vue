<template>
  <div class="back-header">
    <el-row>
      <el-col :span="2" @click.native="goBack"><img src="/images/pubilc/icon-back.png">返回</el-col>
      <el-col :span="22"></el-col>
    </el-row>
  </div>

</template>
<script>
export default {
  data(){
    return {

    }
  },
  created(){

  },
  methods:{
    goBack(){
      this.$router.go(-1);
    }
  }
}
</script>
<style lang="scss">
.back-header{
  border-bottom: 1px solid #E4E6EA;
  height: 50px;
  line-height: 50px;
  color: #3E84D6;
  font-size: 14px;
  .el-row
  {
    .el-col-2{
      cursor: pointer;
    }
  }
  img{
    margin: 0 5px 0 15px;
    vertical-align: middle;
  }
}
</style>

