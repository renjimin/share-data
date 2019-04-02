<template>
  <div class="login-page">
    <canvas ref="canvas"></canvas>
    <div class="logo-box">
      <img class="logo" src="../../assets/images/logo.jpg" alt>
      <!-- <img class="zsk-logo" src="../../assets/images/zsk-logo.png" alt> -->
    </div>
    <div :class="['login-container',{active:currentCom=='ResetPassCom'}]">
      <transition name="zui-zoom">
        <component :is="currentCom" :currentCom.sync="currentCom"></component>
      </transition>
    </div>
  </div>
</template>
<script src="./Login.js"></script>
<style lang="scss" src="./Login.scss"></style>