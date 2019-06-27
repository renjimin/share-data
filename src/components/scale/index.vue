<template>
  <el-popover
  placement="bottom"
  width="400"
  popper-class="sacle"
  trigger="click">
    <el-row :gutter="10">
      <el-col :span="6" v-for="(item,index) in sacleData" :key="index" @click.native="selectsacle(item)"><div class="grid-content bg-purple"></div>{{item.sacle}}</el-col>
    </el-row>
    <el-button slot="reference" round type="primary" size="mini">比例尺</el-button>
  </el-popover>
</template>
<script>
  export default {
    data() {
      return {
        sacleData: [{
          sacle: '1：10000',
          sacletype:1
        },{
          sacle: '1：100000',
          sacletype:1
        },{
          sacle: '1：200000',
          sacletype:1
        },{
          sacle: ' 1：500000',
          sacletype:1
        },{
          sacle: '1：1000000',
          sacletype:1
        }]
      };
    },
    methods:{
      selectsacle(item) {
        let temp = {};
        temp.name = item.sacle;
        temp.type = '';
        this.$emit('messageData',temp)
      }
    }
  };
</script>
<style lang="scss" scoped>
.sacle{
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
