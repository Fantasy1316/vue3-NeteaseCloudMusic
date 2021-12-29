<template>
  <div class="mini-audio-player">
    <div class="player-cover">
      <div class="player-cover--image">
        <img src="../../assets/images/neteasecloud-logo.png" alt="" />
      </div>
    </div>
    <div class="player-info">
      <span class="player-info--name">爱在西元前爱在西元爱在西爱在爱</span>
      <span class="player-info--singer"> - 周杰伦</span>
    </div>
    <div class="player-contral">
      <i class="iconfont icon-bofang" v-if="true"></i>
      <i class="iconfont icon-zanting" v-else></i>
    </div>
    <i class="iconfont icon-bofangliebiao"></i>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.mini-audio-player {
  display: flex;
  align-items: center;
  position: relative;
  height: 48px;
  padding: 0 16px;

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

      img {
        width: 100%;
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
</style>
