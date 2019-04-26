<template>
  <div class="page-viewDetail">
    <OMap></OMap>
    <el-main>
      <el-row>
        <el-col :span='5'>行政区要素属性表  (3142 要素，已选择 1 要素)</el-col>
        <el-col :span='2'>
          <el-button size="mini">下载</el-button>
        </el-col>
        <el-col :span='7'>
          <i class="el-icon-info"></i>勾选要素或者在地图上框选范围进行下载</el-col>
        <el-col :span='10'>收起</el-col>
      </el-row>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="ID"
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="date"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>


<script>
import OMap from "@/components/openlayer/index";
export default {
    data(){
        return {
          tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
        }
    },
    methods:{

    },
    components: {
      OMap
    },
}
</script>
<style lang="scss">
.page-viewDetail{
  background-color: #FFFFFF;
  .el-main{
    margin: 20px;
    padding: 5px;
    border: 1px solid #EAEAEA;
    .el-row{
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #EAEAEA;
      .el-col-10{
        text-align: right;
      }
    }
  }
}
</style>

