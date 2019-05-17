<template>
  <div class="control-content">
    <div class="control-head">
      <h2 class="controllist-name">
        <img src="/images/manage/index/icon-bj.png">
        权限申请单
        <button class="control_button" style="margin-top: -8px;" id="addBtn" @click="submit">提交</button>
      </h2>
    </div>
    <div class="control-info">
      <el-row>
        <el-col :span="10">
          <p class="control-base">基本信息</p>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="申请人:" prop="username">
              <el-input type="text" v-model="ruleForm.username" autocomplete="off" readonly></el-input>
            </el-form-item>
            <el-form-item label="角色:" >
              <el-select v-model="ruleForm.roleId" placeholder="请选择角色">
                <el-option :label="item.roleName" :value="item.id" v-for="(item,index) in allrole" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="11">
          <p class="control-base">角色下的图层权限</p>
          <el-tree
            :data="treedata"
            show-checkbox
            ref="tree"
            node-key="id"
            :default-expanded-keys="[1, 1]"
            :default-checked-keys="[5]"
            :props="defaultProps">
          </el-tree>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { categoryTree, AdduserRole } from '@/api/manage/resourceMonitoring/index'
  export default {
    data() {
      return {
        tableData: [],
        form:{},
        ruleForm:{},
        status:[
          '进行中',
          '已同意申请',
          '已拒绝申请'
        ],
      }
    },
    created() {
      this.initData();
    },
    methods:{
      async initData() {
        let resall = await categoryTree();
        this.treedata =  this.treeData(resall.data);
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
      async submit() {
        let params = {
          userId:'',
          userName:'',
          roleId:''
        }
        let res =  await AdduserRole(params);
      }
    }
  }
</script>
<style lang="scss">
.control-content{
  .control-head{
    width: 940px;
    margin: 60px auto;
    background-color: rgb(255, 255, 255);
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
    padding: 0 10px;
    .controllist-name{

      color: #6e7073;
      font-size: 17px;
      padding: 20px 30px 20px 0;
      font-weight: bold;
      margin: 0;
      img{
        vertical-align: middle;
      }
      .control_button{
        border-radius: 4px;
        width: 78px;
        height: 32px;
        border: none;
        color: #FFF;
        cursor: pointer;
        background-image: -moz-linear-gradient( 0deg, rgb(0,141,254) 0%, rgb(0,198,251) 100%);
        background-image: -ms-linear-gradient( 0deg, rgb(0,141,254) 0%, rgb(0,198,251) 100%);
        background-image: -webkit-linear-gradient( 0deg, rgb(0,141,254) 0%, rgb(0,198,251) 100%);
        float: right;
      }

    }
  }
  .control-info{
    width: 940px;
    margin: 0 auto;
    .el-row{
      .el-col-10,.el-col-11{
        width: 465px;
        border: 0;
        border-top: 3px solid;
        min-height: 600px;
        border-image: -webkit-linear-gradient(#008dfe,#00c6fb) 30 30;
        border-image: -moz-linear-gradient(#008dfe,#00c6fb) 30 30;
        border-image: linear-gradient(#008dfe,#00c6fb) 30 30;
        background-color: rgb(255, 255, 255);
        box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.15);
        .control-base{
          border-bottom: #dddddd 1px dashed;
          padding: 20px;
          font-weight: bold;
        }
        .el-input__inner{
          border: #bfbfbf 1px solid;
          width: 280px;
          height: 38px;
          border-radius: 4px;
          text-indent: 10px;
        }
      }
      .el-col-11{
        margin-left: 10px;
      }
    }
  }
}
</style>

