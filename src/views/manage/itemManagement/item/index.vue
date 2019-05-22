<template>
  <div class="manage-tree">
    <div>
      <h2 class="table-name">栏目管理
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
        :render-content="renderContent">
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
    async handledata(data,type) {
      this.dialogVisible = true;
      this.currentdata = data;
      this.currenttype = type;
      // this.$prompt('', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      // }).then(({ value }) => {
      //   const newChild = { id: id++, name: 'testtest', children: [] };
      //   // if (!value.children) {
      //   //   this.$set(value, 'children', []);
      //   // }
      //   this.treedata.children.push(value);
      // }).catch(() => {
      //   this.$message({
      //     type: 'info',
      //     message: '取消输入'
      //   });
      // });
      // const newChild = { id: id++, label: 'testtest', children: [] };
      // if (!data.children) {
      //   this.$set(data, 'children', []);
      // }
      // data.children.push(newChild);
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
            <span>{node.label}</span>
          </span>
          <span>
            <el-button style="font-size: 12px;" type="text" on-click={ () => this.handledata(data,'add') }>添加</el-button>
            <el-button style="font-size: 12px;" type="text" on-click={ () => this.handledata(data,'edit') }>编辑</el-button>
            <el-button style="font-size: 12px;" type="text" on-click={ () => this.remove(node, data) }>删除</el-button>
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
.manage-tree{
  .el-tree{
    width: 40%;
    padding: 20px 0;
  }
}

</style>
