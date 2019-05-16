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
      <el-form-item prop="password">
        <el-input
          maxlength="4"
          v-model="formData.password"
          clearable
          placeholder="请输入验证码"
          type="password"
        >
        </el-input>
        <img src="http://192.168.99.128:8083/datashare/code">
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
import { getToken_api } from "_api/user";
import { mapActions } from "vuex";
import mixin from "./mixin";
export default {
  name: "loginCom",
  props: ["currentCom"],
  mixins: [mixin],
  data() {
    let checkPhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        const phoneReg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
        if (!phoneReg.test(value)) {
          callback(new Error("手机号格式不正确"));
          return false;
        }
        callback();
      }
    };
    return {
      btnLoading: false,
      formData: {},
      rules: {
        phone: [
          {
            required: true,
            message: "请输入手机号",
            trigger: "blur"
          },
          { validator: checkPhone, trigger: "blur" }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions("user", ["loginAct"]),
    login() {
      this.$refs["ruleForm"].validate(async valid => {
        if (valid) {
          this.btnLoading = true;
          this.$global.openLoading("登录中...");
          try {
            let { token, userInfo } = await getToken_api(this.formData);
            await this.loginAct({ token, userName: userInfo.userName });
            this.$router.push("/dashboard");
            this.$global.closeLoading();
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
    watchChanged() {
      const { password, phone } = this.userInput;
      this.formData = {
        password,
        phone
      };
    }
  }
};
</script>
