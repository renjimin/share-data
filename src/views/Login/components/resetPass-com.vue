<template>
  <div>
    <div class="login-title">找回密码</div>
    <el-form
      class="form-con"
      size="small"
      ref="ruleForm"
      :model="formData"
      :rules="rules"
      @submit.native.prevent
    >
      <el-form-item prop="phone">
        <el-input maxlength="11" v-model="formData.phone" clearable placeholder="请输入手机号">
          <template slot="prepend">
            <i class="el-icon-z-mobile"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="smsCode" prop="smsCode">
        <el-input maxlength="6" v-model="formData.smsCode" clearable placeholder="请输入验证码">
          <i slot="prepend" class="el-icon-z-safe"></i>
        </el-input>
        <el-button
          @click="getSmsCode"
          :disabled="verifyCode.disabled"
          type="primary"
        >{{verifyCode.content}}</el-button>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          maxlength="20"
          v-model="formData.password"
          clearable
          placeholder="请输入密码"
          type="password"
        >
          <i slot="prepend" class="el-icon-z-lock"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          native-type="submit"
          style="width: 100%"
          type="primary"
          :loading="btnLoading"
          @click="updatePassword"
        >重置密码</el-button>
      </el-form-item>
      <div class="reset-password" @click="$emit('update:currentCom','LoginCom')">返回登录</div>
    </el-form>
  </div>
</template>
<script>
import { getSmsCode_api, updatePassword_api } from "_api/user";
import mixin from "./mixin";
export default {
  name: "resetPass",
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
      formData: {
        phone: "",
        password: "",
        smsCode: ""
      },
      verifyCode: {
        countDown: 120,
        content: "验证码",
        disabled: false
      },
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
        ],
        smsCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  destroyed() {
    clearInterval(this.timer);
  },
  methods: {
    // 验证手机号
    _checkPhone() {
      const phoneReg = /^(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
      if (!this.formData.phone.trim()) {
        this.$message.warning("请输入手机号");
        return false;
      }
      if (!phoneReg.test(this.formData.phone)) {
        this.$message.warning("手机号格式不正确");
        return false;
      }
      return true;
    },
    // 获取验证码
    async getSmsCode() {
      let { phone } = this.formData;
      if (!this._checkPhone()) return;
      this.$global.openLoading("获取验证码中...");
      await getSmsCode_api(phone);
      this.startTimer();
      this.$global.closeLoading();
      this.$message.success("验证码发送成功，请注意查收");
    },
    // 启动定时器
    startTimer() {
      let countDown = this.verifyCode.countDown;
      this.verifyCode.content = countDown + " s";
      this.verifyCode.disabled = true;
      this.timer = setInterval(() => {
        countDown--;
        if (!countDown) {
          clearInterval(this.timer);
          this.verifyCode.content = "验证码";
          this.verifyCode.disabled = false;
          return;
        }
        this.verifyCode.content = countDown + " s";
      }, 1000);
    },
    // 重置密码
    updatePassword() {
      this.$refs["ruleForm"].validate(async valid => {
        if (valid) {
          this.btnLoading = true;
          this.$global.openLoading();
          try {
            await updatePassword_api(this.formData);
            this.$global.closeLoading();
            this.$message.success("密码修改成功，请重新登录");
            this.changeCurrentCom("LoginCom");
          } catch (error) {
            this.btnLoading = false;
          }
        }
      });
    },
    watchChanged() {
      this.formData.phone = this.userInput.phone;
    }
  }
};
</script>
<style lang="scss">
.login-page .smsCode .el-form-item__content {
  display: flex;
  .el-input__inner {
    border-radius: 0;
  }
  .el-button {
    border-radius: 0 3px 3px 0;
  }
}
</style>
