<template>
  <div class="app-container">
    <!-- <router-view class="app-container--routerview" v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view> -->
    <router-view class="app-container--routerview"></router-view>
    <div class="app-container--miniplayer">
      <mini-audio-player />
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

    <!-- 音乐播放器 -->
    <audio-player />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import MiniAudioPlayer from '@/components/MiniAudioPlayer/miniAudioPlayer.vue'
import AudioPlayer from '@/components/AudioPlayer/audioPlayer.vue'

const active = ref(0)

const themeVars = {
  tabbarItemFontSize: '10px'
}
</script>

<style lang="less" scoped>
.app-container {
  .--mixins-container(#f8f8f8);

  &--routerview {
    flex: 1;
  }

  &--miniplayer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 48px;
    background-color: rgba(255, 255, 255, 0.9);
  }
}
</style>
