<template>
  <transition name="animation-up">
    <div class="audio-player" v-show="fullScreen" :style="audioPlayBgi">
      <div class="audio-player--content">
        <div class="content-header">
          <i
            class="iconfont icon-down"
            @click="handleCommitStore('SET_AUDIOPLAYERFULLSCREEN', false)"
          ></i>
          <div class="content-header--info">
            <p class="info-name">{{ songInfo.name }}</p>
            <p class="info-singer">
              {{ songInfo.singer }}
              <i class="iconfont icon-right"></i>
            </p>
          </div>
          <i class="iconfont icon-fenxiangpt-wangyiicon"></i>
        </div>
        <div class="content-disc">
          <img
            src="../../assets/images/ciz.png"
            class="content-disc--needle"
            :class="{ 'content-disc--needle__rotate': !currentSongStatus }"
            alt=""
          />
          <div class="content-disc--cover">
            <div class="cover-img" :style="discCoverStyle">
              <img :src="songInfo.cover" alt="" />
            </div>
          </div>
        </div>
        <div class="content-contral">
          <div class="content-contral--top">
            <i class="iconfont icon-xihuan-kongpt-wangyiicon"></i>
            <i class="iconfont icon-xiazaipt"></i>
            <i class="iconfont icon-pinglunpt-wangyiicon"></i>
            <i class="iconfont icon-xinxi"></i>
          </div>
          <div class="content-contral--mid">
            <p class="mid-start">{{ handleSecondFormat(songCurrentSrcond) }}</p>
            <div class="mid-progress"></div>
            <p class="mid-end">{{ handleSecondFormat(songAllSecond) }}</p>
          </div>
          <div class="content-contral--btm">
            <i class="iconfont icon-suijibofang-wangyiicon"></i>
            <i class="iconfont icon-shangyiqu-wangyiicon"></i>
            <i
              class="iconfont icon-zanting-wangyiicon"
              v-if="!currentSongStatus"
              @click="handleCommitStore('SET_CURRENTSONGSTATUS', 1)"
            ></i>
            <i
              class="iconfont icon-bofang-wangyiicon"
              v-else
              @click="handleCommitStore('SET_CURRENTSONGSTATUS', 0)"
            ></i>
            <i class="iconfont icon-xiayiqu-wangyiicon"></i>
            <i class="iconfont icon-caidan"></i>
          </div>
        </div>
      </div>
      <audio ref="audioRef"></audio>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, Ref, computed, watch } from 'vue'
import { songUrl, songDetail } from '@/api/index'
import { useStoreMethods } from '@/utils/global'
import useRotate from './use-rotate'

const { store, handleCommitStore } = useStoreMethods()
const { discCoverStyle } = useRotate()

const fullScreen = computed(() => {
  return store.state.audioPlayer.audioPlayerFullScreen
})
const currentSongId = computed(() => {
  return store.state.audioPlayer.currentSongId
})
const currentSongStatus = computed(() => {
  return store.state.audioPlayer.currentSongStatus
})

const audioRef: Ref<null> = ref(null) as any

/** 获取歌曲信息 */
const url: Ref<string> = ref('')
const songInfo: Ref<any> = ref({
  name: '',
  singer: '',
  cover: ''
})
const songAllSecond: Ref<number> = ref(0)
const songCurrentSrcond: Ref<number> = ref(100)
// 歌曲链接
const getSongUrl = async (id: number) => {
  const result = await songUrl({ id })

  if (result) {
    url.value = result.data[0].url

    const audioEl = (audioRef as any).value
    audioEl.src = url.value

    audioEl.oncanplay = () => {
      audioEl.play()
      songAllSecond.value = audioEl.duration
      handleCommitStore('SET_CURRENTSONGSTATUS', 1)
    }
  }
}
// 歌曲详情
const getSongDetail = async (ids: number | string) => {
  const result = await songDetail({ ids })

  if (result) {
    const { name, picUrl } = (result as any).songs[0].al
    const singer = (result as any).songs[0].ar[0].name

    songInfo.value = {
      name,
      singer,
      cover: picUrl
    }
    handleCommitStore('SET_CURRENTSONGINFO', songInfo.value)
  }
}

const audioPlayBgi = computed(() => {
  return {
    background: `url(${songInfo.value.cover})`,
    backgroundSize: '206% 100%',
    backgroundPosition: 'center top',
    backgroundColor: '#333'
  }
})

const handleSecondFormat = (time: number) => {
  const integerTime = Math.round(time)
  if (integerTime >= 60) {
    const minute = Math.floor(integerTime / 60)
    const second = integerTime % 60
    return `${minute >= 10 ? minute : '0' + minute}:${second >= 10 ? second : '0' + second}`
  } else {
    return `00:${integerTime >= 10 ? integerTime : '0' + integerTime}`
  }
}

watch([currentSongId, currentSongStatus], ([newId, newStatus], [oldId, oldStatus]) => {
  if (newId && newId !== oldId) {
    getSongUrl(newId)
    getSongDetail(newId)
  }
  if (newStatus !== oldStatus) {
    const audioEl = (audioRef as any).value
    newStatus ? audioEl.play() : audioEl.pause()
  }
})
</script>

<style lang="less" scoped>
.audio-player {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;

  &--content {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(34px);
    background-color: rgba(0, 0, 0, 0.4);

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

      .icon-fenxiangpt-wangyiicon {
        position: relative;
        top: 0.8px;
        font-size: 22px;
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
        transform: translateX(-12px) rotate(360deg);
        transform-origin: 16px 28px;
        transition: all 0.5s ease;
        z-index: 1;

        &__rotate {
          transform: translateX(-12px) rotate(339deg);
        }
      }

      &--cover {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 280px;
        height: 280px;
        margin: 90px auto 0;
        background: url('../../assets/images/cgy.png') no-repeat;
        background-size: 100% 100%;
        background-color: #333;
        border-radius: 50%;

        .cover-img {
          width: 184px;
          height: 184px;
          border-radius: 50%;

          img {
            width: 100%;
            border-radius: 50%;
          }
        }
      }
    }

    .content-contral {
      position: fixed;
      bottom: 40px;
      left: 20px;
      right: 20px;
      color: #fff;

      &--top {
        display: flex;
        align-items: center;

        .iconfont {
          flex: 1;
          font-size: 24px;
          font-weight: lighter;
          color: #cccccc;
          text-align: center;
        }
      }

      &--mid {
        display: flex;
        align-items: center;
        margin: 20px 0;

        .mid-start,
        .mid-end {
          font-size: 12px;
          color: #ccc;
        }

        .mid-progress {
          flex: 1;
          height: 1px;
          border-radius: 1px;
          background-color: rgb(83, 83, 83);
          margin: 0 10px;
        }
      }

      &--btm {
        display: flex;
        align-items: center;

        .iconfont {
          flex: 1;
          font-size: 24px;
          text-align: center;
        }

        .icon-zanting-wangyiicon,
        .icon-bofang-wangyiicon {
          font-size: 54px;
        }
      }
    }
  }
}

.refresh-loading {
  animation: rotation 10s linear infinite;
}
</style>
