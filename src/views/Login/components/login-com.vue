<template>
  <div>
    <div class="login-title">登录</div>
    <el-form
      class="form-con"
      size="small"
      :model="formData"
      :rules="rules"
      ref="ruleForm"
      @submit.native.prevent
    >
      <el-form-item prop="phone">
        <el-input maxlength="11" v-model="formData.phone" clearable placeholder="请输入手机号">
          <template slot="prepend">
            <i class="el-icon-z-mobile"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          maxlength="20"
          v-model="formData.password"
          clearable
          placeholder="请输入密码"
          type="password"
        >
          <template slot="prepend">
            <i class="el-icon-z-lock"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password" class="code">
        <el-input
          maxlength="4"
          v-model="formData.code"
          clearable
          placeholder="请输入验证码"
          type="text"
        >
        </el-input>
        <img :src="currentsrc" @click="refresh">
      </el-form-item>
      <el-form-item>
        <el-button
          native-type="submit"
          style="width: 100%"
          type="primary"
          @click="login"
          :loading="btnLoading"
        >登录</el-button>
      </el-form-item>
      <div class="reset-password" @click="changeCurrentCom('ResetPassCom')">忘记密码</div>
    </el-form>
  </div>
</template>
<script>
import { useLogin } from "@/api/login/index";
import { mapActions } from "vuex";
import { guid } from "@/libs/utils"
import mixin from "./mixin";
export default {
  name: "loginCom",
  props: ["currentCom"],
  mixins: [mixin],
  data() {
    // let checkPhone = (rule, value, callback) => {
    //   if (value === "") {
    //     callback(new Error("请输入手机号"));
    //   } else {
    //     const phoneReg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
    //     if (!phoneReg.test(value)) {
    //       callback(new Error("手机号格式不正确"));
    //       return false;
    //     }
    //     callback();
    //   }
    // };
    return {
      btnLoading: false,
      formData: {},
      randomCode:'',
      currentsrc:'',

      // rules: {
      //   phone: [
      //     {
      //       required: true,
      //       message: "请输入手机号",
      //       trigger: "blur"
      //     },
      //     { validator: checkPhone, trigger: "blur" }
      //   ],
      //   password: [
      //     {
      //       required: true,
      //       message: "请输入密码",
      //       trigger: "blur"
      //     }
      //   ]
      // }
    };
  },
  created() {
    this.initData();
  },
  methods: {
    ...mapActions("user", ["loginAct"]),
    initData() {
      this.randomCode=guid();
      this.currentsrc=`http://192.168.99.128:8083/datashare/code?randomCode=${this.randomCode}`;
    },
    login() {
      this.$refs["ruleForm"].validate(async valid => {
        if (valid) {
          this.btnLoading = true;
          this.$global.openLoading("登录中...");
          try {
            let parms = {
              username:this.formData.phone,
              password:this.formData.password,
              randomCode:this.randomCode,
              code:this.formData.code
            }
            let res =  await useLogin(parms);
            const { code, data } = res;
            if (code === '0') {
              console.log(this.$router)
              this.$router.push("/home");
              this.$global.closeLoading();
            }
          } catch (error) {
            if (typeof error == "object") {
              this.$message({
                type: "error",
                message: error.errMsg,
                showClose: true
              });
            }
            this.btnLoading = false;
          }
        }
      });
    },
    refresh() {
      this.randomCode = guid()
      this.currentsrc=`http://192.168.99.128:8083/datashare/code?randomCode=${this.randomCode}&t=${new Date()}`;
    },
  }
};
</script>
<style lang="scss">
.login-container{
  .code{
    .el-input{
      display: initial;
      .el-input__inner{
        width: 180px;
      }
    }
    img{
      vertical-align: middle;
      margin-left: 8px;
    }
  }
}
</style>
