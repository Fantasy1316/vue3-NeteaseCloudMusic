<template>
  <div class="audio-player" v-show="fullScreen">
    <div class="audio-player--content">
      <div class="content-header">
        <i
          class="iconfont icon-down"
          @click="handleCommitStore('SET_AUDIOPLAYERFULLSCREEN', false)"
        ></i>
        <div class="content-header--info">
          <p class="info-name">爱在西元前</p>
          <p class="info-singer">
            周杰伦
            <i class="iconfont icon-right"></i>
          </p>
        </div>
        <i class="iconfont icon-share"></i>
      </div>
      <div class="content-disc">
        <img src="../../assets/images/ciz.png" class="content-disc--needle" alt="" />
        <div class="content-disc--cover refresh-loading">
          <div class="cover-img">
            <img src="../../assets/images/fantic.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStoreMethods } from '@/utils/global'

const { store, handleCommitStore } = useStoreMethods()

const fullScreen = computed(() => {
  return store.state.audioPlayer.audioPlayerFullScreen
})
</script>

<style lang="less" scoped>
.audio-player {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('../../assets/images/fantic.png');
  background-size: 100% 100%;
  background-color: #333;
  z-index: 999;

  &--content {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(35px);

    .content-header {
      display: flex;
      padding: 14px 16px 10px;
      color: #fff;

      .icon-down {
        font-size: 24px;
      }

      .icon-share {
        position: relative;
        top: 1px;
        font-size: 24px;
      }

      &--info {
        flex: 1;
        text-align: center;

        .info-name {
          margin: 4px 0 6px;
        }

        .info-singer {
          font-size: 12px;
          color: #999;

          .icon-right {
            position: relative;
            top: 0.8px;
            font-size: 12px;
          }
        }
      }
    }

    .content-disc {
      position: relative;
      overflow: hidden;

      &--needle {
        position: absolute;
        top: -16px;
        left: 50%;
        width: 90px;
        transform: translateX(-12px) rotate(0);
        transform-origin: 16px 28px;
        z-index: 1;
      }

      &--cover {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 260px;
        height: 260px;
        margin: 90px auto 0;
        background: url('../../assets/images/cgy.png') no-repeat;
        background-size: 100% 100%;
        background-color: #333;
        border-radius: 50%;

        .cover-img {
          width: 172px;
          height: 172px;
          border-radius: 50%;

          img {
            width: 100%;
            border-radius: 50%;
          }
        }
      }
    }
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
