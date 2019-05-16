<template>
  <div class="manage-content">
    <div>
      <h2 class="table-name">基本信息新增
      </h2>
    </div>
    <div class="user-content">
      <p class="user-base">基本信息</p>
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名:" prop="username">
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机号码:" prop="phone">
          <el-input type="text" v-model="ruleForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
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
import { getAllRole, setUseadd } from '@/api/manage/rolemanage/index'
  export default {
    data() {
      let validateUsename = (rule, value, callback) =>{
        console.log(value)
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          console.log(value)
          if (value.length < 2) {
            callback(new Error('最少要输入两个字符!'));
          }else{
            callback();
          }

        }
      };
      let validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      let validatePhone = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入手机号码'));
        }else{
          const phoneReg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
          if (!phoneReg.test(value)) {
            callback(new Error("手机号格式不正确"));
            return false;
          }
          callback();
        }
      };
      let validateEmail = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入邮箱'));
        }else{
          const phoneReg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
          if (!phoneReg.test(value)) {
            callback(new Error("邮箱格式不正确"));
            return false;
          }
          callback();
        }
      };
      return {
        ruleForm: {},
        allrole:'',
        rules: {
          username:[
            { validator:validateUsename,trigger:'blur' }
          ],
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          phone:[
            { validator: validatePhone, trigger: 'blur' }
          ],
          email:[
            { validator: validateEmail, trigger: 'blur' }
          ],
        }
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
      submitForm(formName) {
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let data = {
              username:this.ruleForm.username,
              passwd:this.ruleForm.pass,
              phone:this.ruleForm.phone,
              email:this.ruleForm.email,
              roleId:this.ruleForm.roleId
            }
            let res = await setUseadd(data);
            const { code } = res;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
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

