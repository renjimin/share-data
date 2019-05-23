<template>
  <div class="manage-datamanage">
    <div>
      <h2 class="table-name">数据列表
        <button class="blue_button" style="margin-top: -8px;" id="addBtn" @click="newData">新增数据</button>
      </h2>
    </div>
    <!-- <div>
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
    </div> -->
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
          <img src="/images/manage/index/e-Edit.png" @click="editData(tableData.row)">
          <img class="e-trash" src="/images/manage/index/e-Trash.png" @click="deletData(tableData.row)">
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
      width="75%"
    >
      <el-form  label-width="100px" :model="formLabelAlign" :inline='true'>
        <el-form-item label="数据类型">
          <el-select v-model="formLabelAlign.type" filterable  placeholder="请选择数据类型">
             <el-option :label="item" :value="item" v-for="(item,index) in dataype" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="item.label" v-for="(item,index) in formitem" :key="index">
          <el-input v-model="formLabelAlign[item.moduledata]"></el-input>
        </el-form-item>
        <!-- <el-form-item label="别名">
          <el-input v-model="formLabelAlign.aliasname"></el-input>
        </el-form-item>
        <el-form-item label="图层名称">
          <el-input v-model="formLabelAlign.layerName"></el-input>
        </el-form-item> -->
        <el-form-item label="更新时间">
          <el-date-picker
            v-model="formLabelAlign.updateDate"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-date-picker
            v-model="formLabelAlign.createData"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="数据类型" v-show="firstleve">
          <el-select v-model="formLabelAlign.type" placeholder="请选择数据类型">
            <el-option :label="item" :value="item" v-for="(item,index) in dataype" :key="index"></el-option>
          </el-select>
        </el-form-item> -->
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
import { deleteItem,insertAtttable,updateAtttable,insertDynamic,updateDynamic,insertRaster,updateRaster,insertService,updateService,insertVector,updateVector } from '@/api/manage/itemManage/index'
  export default {
    data() {
      return {
        tableData: [],
        form:{},
        currentPage:1,
        pagesize:10,
        totalpage:0,
        dialogVisible:false,
        formLabelAlign:{},
        currentselect:'',
        currenttype:'',
        dataype:[
          'DynamicNodeGPS',
          'DynamicNodeVideo',
          'DynamicNodeFixed',
          'WMTSNodeType',
          'WMSNodeType',
          'GovDataNode',
          'DLGDataNode'
        ],
        formitem:[
          {'label':'别名','moduledata':'aliasname'},
          {'label':'authorityCode','moduledata':'authorityCode'},
          {'label':'code','moduledata':'code'},
          {'label':'conname','moduledata':'conname'},
          {'label':'db类型','moduledata':'dbtype'},
          {'label':'实例名','moduledata':'instancename'},
          {'label':'图层类型','moduledata':'layerType'},
          {'label':'名称','moduledata':'name'},
          {'label':'密码','moduledata':'password'},
          {'label':'服务','moduledata':'server'},
          {'label':'表名','moduledata':'tableName'},
          {'label':'类型','moduledata':'type'},
          {'label':'创建者','moduledata':'create_user'},
          {'label':'更新者','moduledata':'update_user'},
          {'label':'使用者','moduledata':'user'},
        ]
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
      newData() {
        this.dialogVisible = true;
        this.currenttype = 'insert';
        this.formLabelAlign = {};
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
      editData(item) {
        this.dialogVisible = true;
        this.currentselect = item;
        this.formLabelAlign = item;
        this.currenttype = 'edit';
      },
      /**
       * 删除用户
       */
      deletData(item) {
        this.$confirm('确认删除该条数据吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          let data = {
            id:item.code,
            type:item.type
          }
          let res = await deleteItem(data);
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
      subimtData() {
        if ( this.currenttype === 'edit') {
          this.updateData();
        }else{
          this.insertData();
        }

      },

      async insertData() {
        let res = '';
        let params = {
          "aliasname": this.formLabelAlign.aliasname,
          "authorityCode": this.formLabelAlign.authorityCode,
          "conname": this.formLabelAlign.conname,
          "createDate": this.formLabelAlign.createDate,
          "create_user": this.formLabelAlign.create_user,
          "dbtype": this.formLabelAlign.dbtype,
          "instancename": this.formLabelAlign.instancename,
          "layerType": this.formLabelAlign.layerType,
          "name": this.formLabelAlign.name,
          "parent_id": this.formLabelAlign.parent_id,
          "password": this.formLabelAlign.password,
          "port": this.formLabelAlign.port,
          "server": this.formLabelAlign.server,
          "tableName": this.formLabelAlign.tableName,
          "type": this.formLabelAlign.type,
          "updateDate": this.formLabelAlign.updateDate,
          "update_user": this.formLabelAlign.update_user,
          "user": this.formLabelAlign.user
        }
        switch(this.formLabelAlign.type){
          case 'DynamicNodeGPS':
          case 'DynamicNodeVideo':
          case 'DynamicNodeFixed': //动态数据类型
            res = await insertDynamic(params);
            break;
          case 'WMTSNodeType':
          case 'WMSNodeType'://服务数据类型
            res = await insertService(params);
            break;
          case 'GovDataNode'://政务数据
            res = await insertAtttable(params);
            break;
          case 'DLGDataNode': //矢量数据类型
            res = await insertVector(params);
            break;
          default:
            break;
        }
        const { code } = res;
        if ( code === '0') {
          this.initData();
        }
      },
      async updateData() {
        let res = '';
        let params = {
          "aliasname": this.formLabelAlign.aliasname,
          "authorityCode": this.formLabelAlign.authorityCode,
          "conname": this.formLabelAlign.conname,
          "createDate": this.formLabelAlign.createDate,
          "create_user": this.formLabelAlign.create_user,
          "dbtype": this.formLabelAlign.dbtype,
          "instancename": this.formLabelAlign.instancename,
          "layerType": this.formLabelAlign.layerType,
          "name": this.formLabelAlign.name,
          "parent_id": this.formLabelAlign.parent_id,
          "password": this.formLabelAlign.password,
          "port": this.formLabelAlign.port,
          "server": this.formLabelAlign.server,
          "tableName": this.formLabelAlign.tableName,
          "type": this.formLabelAlign.type,
          "updateDate": this.formLabelAlign.updateDate,
          "update_user": this.formLabelAlign.update_user,
          "user": this.formLabelAlign.user
        }
        switch(this.currentselect.type){
          case 'DynamicNodeGPS':
          case 'DynamicNodeVideo':
          case 'DynamicNodeFixed': //动态数据类型
            res = await updateDynamic(params);
            break;
          case 'WMTSNodeType':
          case 'WMSNodeType'://服务数据类型
            res = await updateService(params);
            break;
          case 'GovDataNode'://政务数据
            res = await updateAtttable(params);
            break;
          case 'DLGDataNode': //矢量数据类型
            res = await updateVector(params);
            break;
          default:
            break;
        }
        const { code } = res;
        if ( code === '0') {
          this.initData();
        }
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
.manage-datamanage{
  .table-name{
    color: #6e7073;
    font-size: 17px;
    padding: 20px 30px 20px 0;
    border-bottom: 1px solid #dbdbdb;
    font-weight: bold;
    margin: 0;
  }
  .el-form{
    .el-form-item{
      .el-input{
        width: auto;
        .el-input__inner{
          padding-left: 30px;
          padding-right: 30px;
        }
      }
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

