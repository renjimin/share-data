<template>
  <div class="manage-content">
    <div>
      <h2 class="table-name">用户申请单列表</h2>
    </div>
    <div class="table-total">全部数据列表 ({{totalPage}})</div>
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
        prop="roleName"
        label="角色"
        width="180">
      </el-table-column>
      <el-table-column
        prop="status[status]"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="applyTime"
        label="申请时间">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="审批时间">
      </el-table-column>
      <el-table-column
        prop="approverName"
        label="审批人">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, jumper"
      :total="totalPage">
    </el-pagination>
  </div>

</template>

<script>
import { getUserRoleApplylist, getUserRoleApplyEdit } from '@/api/manage/applicationfrom/index'
  export default {
    data() {
      return {
        tableData: [],
        form:{},
        status:[
          '进行中',
          '已同意申请',
          '已拒绝申请'
        ],
        currentPage:1,
        pageSize:10,
        totalPage:0
      }
    },
    created() {
      this.initData();
    },
    methods:{
      async initData() {
        let data = {
          "pageSize":10,
          "nowPage":1,
          "userName":this.form.name,
          "startTime":this.form.startTime,
          "endTime":this.form.endTime
        }
        let res = await getUserRoleApplylist(data);
        const { code, list, recordCount } = res;
        if (code === '0') {
          this.tableData = list;
          this.totalPage = recordCount
        }
      },
      async query() {
        let data = {
          "pageSize":10,
          "nowPage":1,
          "userName":this.form.name,
          "startTime":this.form.startTime,
          "endTime":this.form.endTime
        }
        let res = await getUserRoleApplylist(data);
        const { code, list, recordCount } = res;
        if (code === '0') {
          this.tableData = list;
          this.totalPage = recordCount
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      agreeApply() {
        this.$confirm('确认同意该用户的权限申请吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let data = {
            id:item.row.id,
            type:1
          }
          let res = await getUserRoleApplyEdit(data);
          const { code } = res;
          if (code === '0') {
            this.initData();
            this.$message({
              type: 'success',
              message: '审批成功!'
            });
          }else{
            this.$message({
              type: 'warning',
              message: '审批失败!'
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      rejectApply() {
        this.$confirm('确认拒绝该用户的权限申请吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let data = {
            id:item.row.id,
            type:1
          }
          let res = await getUserRoleApplyEdit(data);
          const { code } = res;
          if (code === '0') {
            this.initData();
            this.$message({
              type: 'success',
              message: '审批成功!'
            });
          }else{
            this.$message({
              type: 'warning',
              message: '审批失败!'
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消!'
          });
        });
      },
      async handleCurrentChange(val) {
        let data = {
          "pageSize":10,
          "nowPage":1,
          "userName":this.form.name,
          "startTime":this.form.startTime,
          "endTime":this.form.endTime
        }
        let res = await getUserRoleApplylist(data);
        const { code, list, recordCount } = res;
        if (code === '0') {
          this.tableData = list;
          this.totalPage = recordCount
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

