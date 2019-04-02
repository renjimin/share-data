<template>
  <div class="app-main">
    <section class="app-main_wrap">
      <transition name="fade-transform" mode="out-in">
        <router-view/>
      </transition>
    </section>
  </div>
</template>