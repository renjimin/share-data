<template>
  <div class="seach-data">
    <el-input placeholder="请输入关键字进行搜索" v-model="input5" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" round></el-button>
    </el-input>
  </div>
</template>
<script>
export default {
  name: "Empty",
  props: {
    ptop: {
      type: String,
      default: "40%"
    }
  },
  data() {
    return {
      input5:''
    }
  },  
};
</script>
<style lang='scss' scoped>
.seach-data {
    padding:10px;
    color:#fff;
    position: relative;
    left:20%;
    width: 50%;

    // transform:translate(0%,-50%);
    .input-with-select{
      border-radius: 5px;
    }
}

.zui-no-data__img {
  width: 70px;
}

.zui-no-data__text {
  color: #b5b5b5;
  font-size: 14px;
  margin-top: 15px;
}
</style>