<template>
  <div class="manage-content">
    <div>
      <h2 class="table-name">角色列表
        <button class="blue_button" style="margin-top: -8px;" @click="newRole">新增角色</button>
      </h2>
    </div>
    <div>
      <el-row>
        <el-col :span="18">
          <el-form ref="form" :model="form" label-width="80px" :inline="true">
            <el-form-item label="角色编码:">
              <el-input v-model="form.roleCode"></el-input>
            </el-form-item>
            <el-form-item label="角色名称:">
              <el-input v-model="form.roleName"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
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
        prop="roleCode"
        label="角色编码"
        width="180">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间">
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="tableData">
          <img src="/images/manage/index/e-Edit.png" @click="editUser(tableData)">
          <img class="e-trash" src="/images/manage/index/e-Trash.png" @click="deleteUser(tableData)">
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
import {getrolelist,setDeleteRole} from '@/api/manage/rolelist/index'
  export default {
    data() {
      return {
        tableData: [],
        form:{},
        pageSize:10,
        totalpage:0,
        currentPage:1
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
          "roleCode":this.form.roleCode,
          "username":this.form.roleName
        }
        let res = await getrolelist(data);
        const { code } = res;
        if (code === '0') {
          this.tableData = res.data;
          this.totalpage = res.recordCount;
        }
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      newRole() {
        this.$router.push('/addrole');
      },
      async query() {
        let data = {
          "nowPage":1,
          "pageSize":this.pageSize,
          "roleCode":this.form.roleCode,
          "username":this.form.roleName
        }
        let res = await getrolelist(data);
        const { code } = res;
        if (code === '0') {
          this.tableData = res.data;
          this.totalpage = res.recordCount;
        }
      },
      /**
       * 编辑用户
       */
      editUser(item) {
        debugger
        this.$router.push({name:'editrole',query:{id:item.row.id,roleCode:item.row.roleCode,roleName:item.row.roleName,categoryCodes:item.row.telephone,posIds:item.row.posIds}});
      },
      /**
       * 删除用户
       */
      deleteUser(item) {
        this.$confirm('确认删除该角色吗?删除角色时，会一并删除该角色下的权限！', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let data = {
            ids:item.row.id
          }
          let res = await setDeleteRole(data);
          const { code } = res;
          if (code === '0') {
            this.initData();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }else{
            this.$message({
              type: 'warning',
              message: '删除失败!'
            });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      async handleCurrentChange(val) {
        let data = {
          "nowPage":1,
          "pageSize":this.pageSize,
          "roleCode":this.form.roleCode,
          "username":this.form.roleName
        }
        let res = await getrolelist(data);
        const { code } = res;
        if (code === '0') {
          this.tableData = res.data;
          this.totalpage = res.recordCount;
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
    margin: 10px 28px;
    padding: 10px 0;
  }
  .e-trash{
    margin-left: 10px;
  }
  .table-total{
    font-size: 14px;
    color: #697077;
    background: #e5ebf8;
    padding: 16px 0 16px 20px;
  }
}
</style>

