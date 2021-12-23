<template>
  <div class="app-container">
    <div class="app-container--main">
      <router-view />
    </div>
    <div class="app-container--tabbar">
      <van-config-provider :theme-vars="themeVars">
        <van-tabbar v-model="active" active-color="#f56b60" inactive-color="#999" placeholder>
          <van-tabbar-item icon="home-o">发现</van-tabbar-item>
          <van-tabbar-item icon="search">博客</van-tabbar-item>
          <van-tabbar-item icon="friends-o">我的</van-tabbar-item>
          <van-tabbar-item icon="setting-o">关注</van-tabbar-item>
          <van-tabbar-item icon="setting-o">云村</van-tabbar-item>
        </van-tabbar>
      </van-config-provider>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(0)

const themeVars = {
  tabbarBackgroundColor: '#f8f8f8',
  tabbarItemActiveBackgroundColor: '#f8f8f8',
  tabbarItemFontSize: '10px'
}
</script>

<style lang="less" scoped>
.app-container {
  .--mixins-container(#eeeeee);
  display: flex;
  flex-direction: column;

  &--main {
    flex: 1;
  }
}
</style>
