<template>
  <div class="manage-list">
    <div>
      <h2 class="table-name">
      <span>栏目管理</span>
      <el-tabs v-model="activeName" class="manage-tree"  @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first"></el-tab-pane>
        <el-tab-pane label="配置管理" name="second"></el-tab-pane>
        <el-tab-pane label="角色管理" name="third"></el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth"></el-tab-pane>
      </el-tabs>
        <button class="blue_button" style="margin-top: -8px;" id="addBtn" @click="newItem">新增一级栏目</button>
      </h2>
    </div>
    <div>
      <el-tree
        :data="treedata"
        :props="defaultProps"
        show-checkbox
        node-key="id"
        :expand-on-click-node="false"
        >
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;" slot-scope="{node,data}">
          <span>
            <img style="padding:0 5px;" src="images/manage/index/icon_文件夹.png"/><span>{{node.label}}</span>
          </span>
          <!-- <span>
            <img  src="images/manage/index/icon_文件夹.png"/><span>{{data}}</span>
          </span>           -->
          <span>
            <img style="padding: 0 7px" src="images/manage/index/add.png" @click="handledata(data,'add')"/>
            <img style="padding: 0 7px" src="images/manage/index/edit.png" @click="handledata(data,'edit')"/>
            <img style="padding: 0 7px" src="images/manage/index/Trash.png" @click="remove(node, data)"/>
          </span>
        </span>
      </el-tree>
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
  </div>
</template>


<script>
let id = 1000;
import { getAllTree } from '@/api/index/index'
import { insertCategory, updateCategory, deleteCategory } from '@/api/manage/itemManage/index'
export default {
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dialogVisible:false,
      firstleve:false,
      dataype:[
        'DynamicNodeGPS',
        'DynamicNodeVideo',
        'DynamicNodeFixed',
        'WMTSNodeType',
        'WMSNodeType',
        'GovDataNode',
        'DLGDataNode'
      ],
      formLabelAlign:{},
      activeName:'second',
      currentdata:'',
      currenttype:'',
      treedata:''
    }
  },
  created() {
    this.initData();
  },
  methods: {
    async initData() {
      let resall = await getAllTree();
      this.treedata =  this.treeData(resall.data);
      console.log(this.treedata)
    },
    /**
     * 快速生成树形
     */
    treeData(data){
      let cloneData = JSON.parse(JSON.stringify(data))    // 对源数据深度克隆
      let tree = cloneData.filter(father=>{              //循环所有项
        let branchArr = cloneData.filter(child=>{
          return father.id == child.pId      //返回每一项的子级数组
        });
        if(branchArr.length>0){
          father.children = branchArr;    //如果存在子级，则给父级添加一个children属性，并赋值
        }
        return father.pId==0;      //返回第一层
      });
      return tree     //返回树形数据
    },
    handleClick() {

    },
    async handledata(data,type) {
      this.dialogVisible = true;
      this.currentdata = data;
      this.currenttype = type;
    },
    async newItem() {
      this.dialogVisible = true;
      this.firstleve = true;
      this.currenttype = 'addfirst';
    },
    async submitFirstLeve() {
      let params = {
        "aliasName": this.formLabelAlign.aliasName,
        "createUser": this.formLabelAlign.createUser,
        "name": this.formLabelAlign.name,
        "parentId": '0',
        "type": this.formLabelAlign.type,
        "updateUser": this.formLabelAlign.updateUser
      };
      let res =  await insertCategory(params);
      const { code } = res;
      if (code === '0') {

        // const newChild = { id: this.currentdata.id, name: this.formLabelAlign.name, children: [] };
        // if (!this.currentdata.children) {
        //   this.$set(this.currentdata, 'children', []);
        // }
        // data.children.push(newChild);
      }
    },
    async subimtData() {
      switch(this.currenttype) {
        case 'add':
          this.appendItem(this.currentdata);
          break;
        case 'edit':
          this.updatedata(this.currentdata);
          break;
        case 'addfirst':
          this.submitFirstLeve();
          break;
        default:
          break;
      }
      this.initData();
      this.dialogVisible = false;
    },
    async appendItem(data){
      let params = {
        "aliasName": this.formLabelAlign.aliasName,
        "createUser": this.formLabelAlign.createUser,
        "id": data.id,
        "name": this.formLabelAlign.name,
        "parentId": data.id,
        "type": data.type,
        "updateUser": this.formLabelAlign.updateUser
      }
      let res =  await insertCategory(params);
      const { code } = res;
      if (code === '0') {
        // const newChild = { id: this.currentdata.id, name: this.formLabelAlign.name, children: [] };
        // if (!this.currentdata.children) {
        //   this.$set(this.currentdata, 'children', []);
        // }
        // data.children.push(newChild);
      }
    },
    async updatedata(data) {
      console.log(data)
      this.dialogVisible = true;
      let params = {
        "aliasName": this.formLabelAlign.aliasName,
        "createUser": this.formLabelAlign.createUser,
        "id": data.id,
        "name": this.formLabelAlign.name,
        "parentId": data.pId,
        "type": data.type,
        "updateUser": this.formLabelAlign.updateUser
      }
      let res =  await updateCategory(params);
      const { code } = res;
      if (code === '0') {
        // const newChild = { id: this.currentdata.id, name: this.formLabelAlign.name, children: [] };
        // if (!this.currentdata.children) {
        //   this.$set(this.currentdata, 'children', []);
        // }
        // data.children.push(newChild);
      }
    },
    async remove(node, data) {
      console.log(node,data)
      let params = {
        id:data.id,
        type:data.type
      }
      let res =  await deleteCategory(params);
      const { code } = res;
      if ( code === '0' ) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      }

    },

    renderContent(h, { node, data, store }) {
      return (
        <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
          <span>
            <img  src="images/manage/index/icon_文件夹.png"/><span>{node.label}</span>
          </span>
          <span>
            <img style="padding: 0 7px" src="images/manage/index/add.png" on-click={ () => this.handledata(data,'add') }/>
            <img style="padding: 0 7px" src="images/manage/index/edit.png" on-click={ () => this.handledata(data,'edit') }/>
            <img style="padding: 0 7px" src="images/manage/index/Trash.png" on-click={ () => this.remove(node, data) }/>
          </span>
        </span>);
    },
    itemManage() {
      switch(item.type){
        case 'DynamicNodeGPS':
        case 'DynamicNodeVideo':
        case 'DynamicNodeFixed': //动态数据类型
          break;
        case 'WMTSNodeType':
        case 'WMSNodeType'://服务数据类型
          break;
        case 'GovDataNode'://栅格/影像数据类型
          break;
        case 'DLGDataNode': //矢量数据类型
          break;
        default:
          break;
      }
    }
  }
};
</script>
<style lang="scss">
.manage-list{
  .table-name{
    border-bottom: solid 1px #DBDBDB;
    span{
      margin-right: 20px;
    }
  }
  .manage-tree{
    display: inline-grid;
    .el-tabs__item {
      text-align: center;
      padding: 0 20px !important;
      margin-right: 0 !important;
      height: 40px;
      box-sizing: border-box;
      line-height: 40px;
      display: inline-block;
      list-style: none;
      font-size: 14px;
      font-weight: 500;
      color: #303133 !important;
      background: none !important;
      position: relative;
    }
    .is-active{
      color: #409eff !important;
    }
  }
  .el-tree{
    width: 50%;
    padding: 20px 0;
  }
}

</style>
