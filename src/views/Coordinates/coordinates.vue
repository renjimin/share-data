<template>
    <div>
        <el-row :gutter="12">
            <div v-for="o in 4" :key="o" class="text item">   
                <el-col :span="8">
                    <el-card class="box-card" shadow="hover">
                    <div slot="header" class="clearfix">
                        <span>全球影像地图</span>
                        <el-button style="float: right; padding: 3px 0" type="text">详情</el-button>
                    </div>
                    <div class="text item">
                        {{'全球影响地图 '}}
                    </div>
                    </el-card> 
                </el-col>
            </div>
        </el-row>
    </div>
</template>
<script>
export default {
  data() {
    return {
      
    };
  },
  computed: {

  },
  created() {

  },
  methods: {
  },
};
</script>
<style>
  /* .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  } */

  /* .box-card {
    width: 50%
  } */
</style>