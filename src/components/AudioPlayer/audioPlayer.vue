<template>
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
        <i class="iconfont icon-share"></i>
      </div>
      <div class="content-disc">
        <img
          src="../../assets/images/ciz.png"
          class="content-disc--needle"
          :class="{ 'content-disc--needle__rotate': !currentSongStatus }"
          alt=""
        />
        <div class="content-disc--cover" :class="{ 'refresh-loading': currentSongStatus }">
          <div class="cover-img">
            <img
              :src="songInfo.cover"
              alt=""
              @click="handleCommitStore('SET_CURRENTSONGSTATUS', currentSongStatus ? 0 : 1)"
            />
          </div>
        </div>
      </div>
    </div>
    <audio ref="audioRef"></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, Ref, computed, watch } from 'vue'
import { songUrl, songDetail } from '@/api/index'
import { useStoreMethods } from '@/utils/global'

const { store, handleCommitStore } = useStoreMethods()

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
// 歌曲链接
const getSongUrl = async (id: number) => {
  const result = await songUrl({ id })

  if (result) {
    url.value = result.data[0].url

    const audioEl = (audioRef as any).value

    audioEl.src = url.value
    audioEl.play()
    handleCommitStore('SET_CURRENTSONGSTATUS', 1)
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
