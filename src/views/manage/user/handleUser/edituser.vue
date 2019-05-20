<template>
  <div class="manage-content">
    <div>
      <h2 class="table-name">基本信息编辑
      </h2>
    </div>
    <div class="user-content">
      <p class="user-base">基本信息</p>
      <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名:" >
          <el-input type="text" v-model="ruleForm.username" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="手机号码:" >
          <el-input type="text" v-model="ruleForm.telephone" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:">
          <el-input type="text" v-model="ruleForm.email" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="角色:" >
          <el-select v-model="ruleForm.roleId" placeholder="请选择角色">
            <el-option :label="item.roleName" :value="item.id" v-for="(item,index) in allrole" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="blue_button" type="primary" @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script>
import { getAllRole, seteditUser } from '@/api/manage/rolemanage/index'
  export default {
    data() {
      return {
        ruleForm: this.$route.query,
        allrole:'',
      }
    },
    created() {
      this.initData();
    },
    methods:{
      async initData() {
        let res = await getAllRole();
        const { code } = res;
        if (code === '0') {
          this.allrole = res.data;
        }
      },
      async submitForm(formName) {
        let data = {
          username:this.$route.query.username,
          userId:this.$route.query.userId,
          roleId:this.ruleForm.roleId,
        }
        let res = await seteditUser(data);
        const { code } = res;
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
  .user-content{
    width: 55%;
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
}
</style>

