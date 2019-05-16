<template>
  <div>
    <el-button @click="backHome" size="small" type="text">返回首页</el-button>
    <el-button @click="backPrev" size="small" type="text">返回上一页({{ second }}s)</el-button>
  </div>
</template>

<script>
import './error.scss';
export default {
  name: 'backBtnGroup',
  data() {
    return {
      second: 5,
      timer: null
    };
  },
  methods: {
    backHome() {
      this.$router.replace({
        name: 'home'
      });
    },
    backPrev() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      if (this.second === 0) this.backPrev();
      else this.second--;
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.timer);
  }
};
</script>
