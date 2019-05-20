<template>
  <div class="application-content">
    <div>
      <h2 class="table-name">用户申请单列表</h2>
    </div>
    <div>
      <el-row>
        <el-col :span="22">
          <el-form ref="form" :model="form" label-width="100px" :inline="true">
            <el-form-item label="用户名:">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="申请起始时间:">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.startTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="申请终止时间:">
              <el-date-picker type="date" placeholder="选择日期" v-model="form.endTime" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="2">
          <button class="blue_button" @click="query">查询</button>
        </el-col>
      </el-row>
    </div>
    <div class="table-total">全部数据列表 ({{totalPage}})</div>
    <el-table
      :data="tableData"
      :row-class-name="tableRowClassName"
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
        prop="state"
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
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="tableData" >
          <div v-if="tableData.row.status =='0'">
            <el-button @click="agreeApply(tableData)" type="text" size="small">同意申请</el-button> |
            <el-button class="reject-btn" type="text" size="small" @click="rejectApply(tableData)">拒绝申请</el-button>
          </div>
        </template>
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
        statusDic:[
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
      tableRowClassName({row, rowIndex}) {
        if (rowIndex%2 === 1) {
          return 'odd-row';
        } else{
          return 'even-row';
        }
        return '';
      },
      async initData(page = 1) {
        let data  = {
          "nowPage":page,
          "pageSize":this.pageSize,
          "userName":this.form.name,
          "startTime":new Date(this.form.startTime).getTime(),
          "endTime":new Date(this.form.endTime).getTime()
        }
        if (data.startTime > data.endTime) {
          this.$message({
            type: 'warning',
            message: '开始时间大于结束时间!'
          });
          return;
        }
        let res = await getUserRoleApplylist(data);
        const { code, list, recordCount } = res;
        if (code === '0') {
          this.tableData = list;
          this.tableData.forEach(element => {
            element.state = this.statusDic[element.status];
          });
          this.totalPage = recordCount
        }
      },
      async query() {
        this.initData();
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      agreeApply(item) {
        this.$confirm('确认同意该用户的权限申请吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let data = {
            "id": item.row.id,
            "roleId": item.row.roleId,
            "type": 1,
            "userId": item.row.userId,
            "userName": item.row.userName
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
      rejectApply(item) {
        this.$confirm('确认拒绝该用户的权限申请吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let data = {
            "id": item.row.id,
            "roleId": item.row.roleId,
            "type": 0,
            "userId": item.row.userId,
            "userName": item.row.userName
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
        this.initData(val);
      }
    }
  }
</script>
<style lang="scss">
.application-content{
  .table-name{
    color: #6e7073;
    font-size: 17px;
    padding: 20px 30px 20px 0;
    border-bottom: 1px solid #dbdbdb;
    font-weight: bold;
    margin: 0;
  }
  .el-table{
    .odd-row {
      background: #f4f5ff;
    }
    .even-row {
      background: #ffffff;
    }
    .reject-btn{
      margin-left: 0;
    }
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

