<template>
  <div class="zui-no-data" :style="{top:ptop}">
    <img class="zui-no-data__img" src="../../assets/images/icon-null.png" alt>
    <p class="zui-no-data__text">
      <slot>暂无数据</slot>
    </p>
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
  }
};
</script>
<style lang='scss' scoped>
.zui-no-data {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  opacity: 0.5;
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