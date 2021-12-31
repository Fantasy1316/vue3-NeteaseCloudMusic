<template>
  <div class="mini-audio-player" @click="handleCommitStore('SET_AUDIOPLAYERFULLSCREEN', true)">
    <div class="player-cover" :class="{ 'refresh-loading': currentSongStatus }">
      <div class="player-cover--image">
        <img :src="currentSongInfo.cover" alt="" />
      </div>
    </div>
    <div class="player-info">
      <span class="player-info--name">{{ currentSongInfo.name }}</span>
      <span class="player-info--singer"> - {{ currentSongInfo.singer }}</span>
    </div>
    <div class="player-contral">
      <i
        class="iconfont icon-bofang"
        v-if="!currentSongStatus"
        @click.stop="handleCommitStore('SET_CURRENTSONGSTATUS', 1)"
      ></i>
      <i
        class="iconfont icon-zanting"
        v-else
        @click.stop="handleCommitStore('SET_CURRENTSONGSTATUS', 0)"
      ></i>
    </div>
    <i class="iconfont icon-bofangliebiao"></i>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStoreMethods } from '@/utils/global'

const { store, handleCommitStore } = useStoreMethods()
const currentSongInfo = computed(() => {
  return store.state.audioPlayer.currentSongInfo
})
const currentSongStatus = computed(() => {
  return store.state.audioPlayer.currentSongStatus
})
</script>

<style lang="less" scoped>
.mini-audio-player {
  display: flex;
  align-items: center;
  position: relative;
  height: 48px;
  padding: 0 16px;
  border-top: 0.5px solid rgb(236, 236, 236);

  .player-cover {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: -2px;
    width: 44px;
    height: 44px;
    background-image: url('../../assets/images/player-desc.png');
    background-size: 100% 100%;
    background-color: #333;
    border-radius: 44px;
    z-index: 1;

    &--image {
      width: 28px;
      height: 28px;
      border-radius: 28px;
      overflow: hidden;

      img {
        width: 100%;
        border-radius: 28px;
      }
    }
  }

  .player-info {
    flex: 1;
    margin: 0 20px 0 54px;
    .--mixins-ellipsis(1);

    &--singer {
      font-size: 12px;
      color: #ccc;
    }
  }

  .player-contral {
    margin-right: 20px;

    .iconfont {
      font-size: 28px;
      color: rgb(90, 90, 90);
    }
  }

  .icon-bofangliebiao {
    font-size: 22px;
    color: rgb(131, 131, 131);
  }
}

.refresh-loading {
  animation: rotation 10s linear infinite;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
