<template>
  <div class="manage-content">
    <div>
      <h2 class="table-name">用户申请列表</h2>
    </div>
    <div>
      <el-row>
        <el-col :span="22">
          <el-form ref="form" :model="form" label-width="100px" :inline="true">
            <el-form-item label="用户名:">
              <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item label="地图名称:">
              <el-input v-model="form.layerName"></el-input>
            </el-form-item>
            <el-form-item label="地图编码:">
              <el-input v-model="form.layerId"></el-input>
            </el-form-item>
            <el-form-item label="是否启用:" >
              <el-select v-model="form.enable" placeholder="请选择">
                <el-option :label="item" :value="index" v-for="(item,index) in status" :key="index">{{item}}</el-option>
              </el-select>
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
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="agreeApply(scope.row)" type="text" size="small">同意申请</el-button>
          <el-button type="text" size="small" @click="rejectApply(scope.row)">拒绝申请</el-button>
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
import { getUserLayerlist } from '@/api/manage/userRights/index'
  export default {
    data() {
      return {
        tableData: [],
        form:{},
        status:[
          '所有',
          '申请公开中',
          '已同意申请',
          '已拒绝申请',
          '申请不公开中',
          '申请已取消'
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
          "nowPage":1,
          "pageSize":this.pageSize,
          "userName":this.form.userName,
          "layerName":this.form.layerName,
          "layerId":this.form.layerId,
          "status":this.form.enable
        }
        let res = await getUserLayerlist(data);
        const { code, list, recordCount } = res;
        if (code === '0') {
          this.tableData = list;
          this.totalPage = recordCount
        }
      },
      query() {
        this.initData();
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
          "nowPage":val,
          "pageSize":this.pageSize,
          "userName":this.form.userName,
          "layerName":this.form.layerName,
          "layerId":this.form.layerId,
          "status":this.form.enable
        }
        let res = await getUserLayerlist(data);
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

