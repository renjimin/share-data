<template>
  <div class="manage-content">
    <div>
      <h2 class="table-name">基本信息新增
        <button class="blue_button" style="margin-top: -8px;" id="addBtn" @click="submitRole">提交</button>
      </h2>
    </div>
    <div class="user-content-left">
      <p class="user-base">基本信息</p>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色编码:">
          <el-input type="text" v-model="ruleForm.roleCode" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="角色名称" prop="roleName">
          <el-input type="text" v-model="ruleForm.roleName" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="user-content-right">
      <p class="user-base">基本信息</p>
      <el-tree
        :data="treedata"
        show-checkbox
        ref="tree"
        node-key="id"
        :default-expanded-keys="[1, 1]"
        :default-checked-keys="[5]"
        :props="defaultProps">
      </el-tree>
    </div>
  </div>

</template>

<script>
import { setEditRole } from '@/api/manage/rolelist/index'
import { getAllTree } from '@/api/index/index'
  export default {
    data() {
      let validateRoleName = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入角色名称'));
        } else {
          if (value.length < 2) {
            callback(new Error('最少要输入两个字符!'));
          }else{
            callback();
          }
        }
      }
      return {
        ruleForm: this.$route.query,
        treedata:'',
        defaultProps: {
          children: 'children',
          label: 'name'
        },
        rules: {
          roleName: [
            { validator: validateRoleName, trigger: 'blur' }
          ],
        }
      }
    },
    created() {
      this.initData();
    },
    methods:{
      async initData() {
        let resall = await getAllTree();
        this.treedata =  this.treeData(resall.data);
        console.log(this.treedata)
        let params = 0;
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
      async submitRole() {
        let params = {
          "categoryCodes": this.$refs.tree.getCheckedKeys(),
          "roleCode": this.ruleForm.roleCode,
          "roleName": this.ruleForm.roleName,
          "id":this.$route.query.id,
          "posIds":this.$route.query.posIds
        };
        let res = await setEditRole(params);
        const { code } = res;
        if (code === '0') {
          this.$router.push('/rolelist');//新增成功后跳转
        }

      },
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
  .user-content-left{
    width: 50%;
    height: 680px;
    border-right: 1px dashed #d9d9d9;
    float: left;
    .user-base{
      padding-top: 20px;
      text-indent: 10px;
      background: url(/images/manage/index/icon-l.png) no-repeat 0px 20px;
      font-weight: bold;
      color: #525252;
    }
    .demo-ruleForm{
      margin: 30px 0 0 50px;
      color: #697077;
      .el-input,.el-select{
        border-width: 1px;
        // border-color: rgb(191, 191, 191);
        // border-style: solid;
        border-radius: 4px;
        width: 60%;
        height: 36px;
        text-indent: 8px;
        margin-bottom: 8px;
      }
      .el-select{
        .el-input{
          width: 100%;
        }
      }
    }
  }
  .user-content-right{
    width: 50%;
    height: 680px;
    border-right: 1px dashed #d9d9d9;
    float: right;
    .user-base{
      padding-top: 20px;
      text-indent: 10px;
      background: url(/images/manage/index/icon-l.png) no-repeat 0px 20px;
      font-weight: bold;
      color: #525252;
    }
    .demo-ruleForm{
      margin: 30px 0 0 50px;
      color: #697077;
      .el-input,.el-select{
        border-width: 1px;
        // border-color: rgb(191, 191, 191);
        // border-style: solid;
        border-radius: 4px;
        width: 60%;
        height: 36px;
        text-indent: 8px;
        margin-bottom: 8px;
      }
      .el-select{
        .el-input{
          width: 100%;
        }
      }
    }
  }
}
</style>

