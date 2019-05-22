<template>
  <div class="manage-content">
    <div>
      <h2 class="table-name">动态数据列表
        <button class="blue_button" style="margin-top: -8px;" id="addBtn" @click="newUser">新增动态数据</button>
      </h2>
    </div>
    <div>
      <el-row>
        <el-col :span="12">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名:">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
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
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="aliasname"
        label="别名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="layerName"
        label="图层名称">
      </el-table-column>
      <el-table-column
        prop="createData"
        label="创建时间">
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
      :page-size="pagesize"
      layout="prev, pager, next, jumper"
      :total="totalpage">
    </el-pagination>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form  label-width="80px" :model="formLabelAlign">
        <el-form-item label="栏目名称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="栏目别名">
          <el-input v-model="formLabelAlign.aliasName"></el-input>
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="formLabelAlign.createUser"></el-input>
        </el-form-item>
        <el-form-item label="更新者">
          <el-input v-model="formLabelAlign.updateUser"></el-input>
        </el-form-item>
        <el-form-item label="数据类型" v-show="firstleve">
          <el-select v-model="formLabelAlign.type" placeholder="请选择数据类型">
            <el-option :label="item" :value="item" v-for="(item,index) in dataype" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="subimtData">确 定</el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import { categoryDetail } from '@/api/index/index'
import { getUselist, setDeleteUser } from '@/api/manage/rolemanage/index'
  export default {
    data() {
      return {
        tableData: [],
        form:{},
        currentPage:1,
        pagesize:10,
        totalpage:0,
        formLabelAlign:''
      }
    },
    created() {
      this.initData(1);
    },
    methods:{
      /**
       * 初始化数据
       */
      async initData(page=1) {
        let params = {
          "nowPage":page,
          "pageSize":this.pagesize,
        }
        let res = await categoryDetail(params);
        const { code, data} = res;
        if (code === '0') {
          this.tableData = data;
          this.totalpage = res.totalCount;
        }
      },
      /**
       * 新增用户
       */
      newUser() {
        this.$router.push('/newuser')
      },
      /**
       * 查询
       */
      async query() {
        this.initData();
      },
      /**
       * 编辑用户
       */
      editUser(item) {
        this.$router.push({name:'edituser',query:{userId:item.row.id,roleId:item.row.roleId,username:item.row.username,telephone:item.row.telephone,email:item.row.email}})
      },
      /**
       * 删除用户
       */
      deleteUser(item) {
        this.$confirm('确认删除该条数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let data = {
            userId:item.row.id
          }
          let res = await setDeleteUser(data);
          const { code } = res;
          if (code === '0') {
            this.initData(1);
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
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      /**
       * 修改页数
       */
      async handleCurrentChange(val) {
        this.initData(val)
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
  .table-total{
    font-size: 14px;
    color: #697077;
    background: #e5ebf8;
    padding: 16px 0 16px 20px;
  }
  .e-trash{
    margin-left: 10px;
  }
}
</style>

