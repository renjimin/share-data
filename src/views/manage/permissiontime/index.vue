<template>
  <div class="manage-content">
    <div>
      <h2 class="table-name">用户权限期间列表</h2>
    </div>
    <div>
      <el-row>
        <el-col :span="22">
          <el-form ref="form" :model="form" label-width="100px" :inline="true">
            <el-form-item label="用户名:">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="开始时间:">
              <el-date-picker
                  v-model="form.startTime"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="结束时间:">
              <el-date-picker
                  v-model="form.endTime"
                  type="daterange"
                  value-format="yyyy-MM-dd"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="2">
          <button class="blue_button" @click="query">查询</button>
        </el-col>
      </el-row>
    </div>
    <div class="table-total">全部数据列表 ({{totalpage}})</div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="userName"
        label="用户名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="权限开始时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="权限结束时间">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="tableData">
          <img src="/images/manage/index/e-Edit.png" @click="editManage(tableData)">
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="totalpage">
    </el-pagination>
  </div>

</template>

<script>
import { getUserlistAuth, getDelayAuth } from '@/api/manage/permissiontime/index'
  export default {
    data() {
      return {
        tableData: [],
        form:{},
        currentPage:1,
        pageSize:10,
        totalpage:0

      }
    },
    created() {
      this.initData();
    },
    methods:{
      async initData() {
        let data = {
          "nowPage":1,
          "pageSize":this.pageSize,
          "userName":'',
          "startS":this.form.startTime[0],
          "startE":this.form.startTime[1],
          "endS":this.form.endTime[0],
          "endE":this.form.endTime[1],
        }
        let res = await getUserlistAuth(data);
        const { code, list, recordCount } = res;
        if ( code === '0' ) {
          this.tableData = list;
          this.totalpage = recordCount;
        }
      },
      async query() {
        let data = {
          "nowPage":1,
          "pageSize":this.pageSize,
          "userName":'',
          "startS":this.form.startTime[0],
          "startE":this.form.startTime[1],
          "endS":this.form.endTime[0],
          "endE":this.form.endTime[1],
        }
        let res = await getUserlistAuth(data);
        const { code, list, recordCount } = res;
        if ( code === '0' ) {
          this.tableData = list;
          this.totalpage = recordCount;
        }
      },
      editManage() {
        this.$confirm('确认要延长用户权限吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let data = {
            userId:item.row.id,
          }
          let res = await getDelayAuth(data);
          const { code } = res;
          if (code === '0') {
            this.initData();
            this.$message({
              type: 'success',
              message: '授权成功!'
            });
          }else{
            this.$message({
              type: 'warning',
              message: '授权失败!'
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      async handleCurrentChange(val) {
        let data = {
          "nowPage":val,
          "pageSize":this.pageSize,
          "userName":'',
          "startS":this.form.startTime[0],
          "startE":this.form.startTime[1],
          "endS":this.form.endTime[0],
          "endE":this.form.endTime[1],
        }
        let res = await getUserlistAuth(data);
        const { code, list, recordCount } = res;
        if ( code === '0' ) {
          this.tableData = list;
          this.totalpage = recordCount;
        }
      }
    }
  }
</script>
<style lang="scss">
.manage-content{
  .table-name{
    color: #6e7073;
    font-size: 17px;
    padding: 20px 30px 20px 0;
    border-bottom: 1px solid #dbdbdb;
    font-weight: bold;
    margin: 0;
  }
  .el-form{

    .el-input{
      width: auto;
    }
  }
  .el-row{
    margin: 10px 0;
    padding: 10px 0;
  }
  .table-total{
    font-size: 14px;
    color: #697077;
    background: #e5ebf8;
    padding: 16px 0 16px 20px;
  }
}
</style>

