<template>
  <el-popover
  placement="bottom"
  width="400"
  popper-class="area"	
  trigger="click">
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">省份</el-menu-item>
    <el-menu-item index="2">城市</el-menu-item>
    <el-menu-item index="3">行政区</el-menu-item>
  </el-menu>
    <el-row :gutter="10">
      <el-col :span="6" v-for="(item,index) in sacleData" :key="index"><div class="grid-content bg-purple"></div>{{item.sacle}}</el-col>
    </el-row>
    <el-button slot="reference" round type="primary">行政区划</el-button>
  </el-popover>
</template>
<script>
  export default {
    data() {
      return {
        activeIndex:'',
        sacleData: [{
          sacle: '北京',
          sacletype:1
        },{
          sacle: '上海',
          sacletype:1
        },{
          sacle: '湖北',
          sacletype:1
        },{
          sacle: '湖南',
          sacletype:1
        },{
          sacle: '江西',
          sacletype:1
        },{
          sacle: '山东',
          sacletype:1
        },{
          sacle: '广西',
          sacletype:1
        },{
          sacle: '新疆',
          sacletype:1
        }]
      };
    },
    methods:{
        handleSelect(){

        }
    }
  };
</script>
<style lang="scss" scoped>
.area{
  .el-menu{
    .el-menu-item{
      height: 30px;
      line-height: 30px;
      width: 33.333%;
      text-align: center;
    }
  }    
  .el-row{
    .el-col{
      padding: 6px;
      text-align: center;
    }
    .el-col:active,.el-col:focus,.el-col:hover{
      background-color: #8C96B0;
      border-radius: 8px;
      color: #FFFFFF;
    }
  }
}
</style>
