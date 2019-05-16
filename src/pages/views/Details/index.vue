<template>
  <div class="page-orderList">
    <section class="zui-header-container"></section>
    <section v-if="true" class="zui-main--container zui-shadow">
      <Table :tabledata="tabledata" :tableCol="tableCol"></Table>
      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryList.pageNum"
        :page-size="queryList.pageSize"
        layout="total, prev, pager, next"
        :total="total"
      /> -->
    </section>
  </div>
</template>


<script>
import Table from '@/components/table'
export default {
    data(){
        return {
            tabledata:[{
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
            }],
            tableCol:[{
                prop:'data',
                label:'姓名',
                width:'180'               
            },{
                prop:'name',
                label:'日期',
                width:'180'               
            },{
                prop:'address',
                label:'地址',
                width:'180'               
            }]
        }
    },
    components:{
       Table 
    }
}
</script>
