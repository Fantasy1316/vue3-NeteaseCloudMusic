<template>
  <div class="findings">
    <div class="findings-header">
      <side-menu />
      <div class="findings-header--search">
        <search />
      </div>
      <i class="iconfont icon-tinggeshiqu"></i>
    </div>
    <div class="findings-swiper">
      <van-config-provider :theme-vars="themeVars">
        <van-swipe class="my-swipe" :autoplay="5000" indicator-color="white" lazy-render>
          <van-swipe-item v-for="banner in bannerList" :key="banner.bannerId">
            <div class="my-swipe--image">
              <img v-lazy="banner.pic" :alt="banner.typeTitle" />
              <p
                class="my-swipe--type"
                :style="{ backgroundColor: banner.titleColor }"
                v-if="banner.showAdTag"
              >
                {{ banner.typeTitle }}
              </p>
            </div>
          </van-swipe-item>
        </van-swipe>
      </van-config-provider>
    </div>
    <div class="findings-nav">
      <div class="findings-nav--item">
        <img src="../../../assets/images/findings-meirituijian.png" alt="每日推荐" />
        <p class="item-name">每日推荐</p>
      </div>
      <div class="findings-nav--item">
        <img src="../../../assets/images/finfings-sirenFM.png" alt="私人FM" />
        <p class="item-name">私人FM</p>
      </div>
      <div class="findings-nav--item">
        <img src="../../../assets/images/findings-gedan.png" alt="歌单" />
        <p class="item-name">歌单</p>
      </div>
      <div class="findings-nav--item">
        <img src="../../../assets/images/findings-paihangbang.png" alt="排行榜" />
        <p class="item-name">排行榜</p>
      </div>
      <div class="findings-nav--item">
        <img src="../../../assets/images/finidngs-zhibo.png" alt="直播" />
        <p class="item-name">直播</p>
      </div>
    </div>
    <div class="findings-recommend">
      <div class="findings-recommend--header">
        <p class="header-title">推荐歌单</p>
        <van-button plain round size="mini">
          更多
          <i class="iconfont icon-right"></i>
        </van-button>
      </div>
      <div class="findings-recommend--list">
        <div class="list-item" v-for="item in recommendList" :key="item.id">
          <div class="list-item--cover">
            <img v-lazy="item.picUrl" class="cover-img" />
            <p class="cover-name">
              <i class="iconfont icon-bofang101"></i>
              {{ Math.floor(item.playCount / 10000) }}万
            </p>
          </div>
          <p class="list-item--name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <div class="findings-songs">
      <div class="findings-songs--header">
        <div class="header-left" @click="handleRefreshSongs">
          <van-button round size="mini" type="default" :class="{ 'refresh-loading': songsLoading }">
            <i class="iconfont icon-refresh"></i>
          </van-button>
          <p class="header-left--title">新歌推荐</p>
        </div>
        <van-button plain round size="mini">
          <i class="iconfont icon-play"></i>
          播放
        </van-button>
      </div>
      <div class="findings-songs--list">
        <div class="list-item" v-for="item in personalizedNewSongList" :key="item.id">
          <div class="list-item--cover">
            <img v-lazy="item.picUrl" alt="" />
            <i class="iconfont icon-play"></i>
          </div>
          <div class="list-item--info">
            <p class="info-song">
              {{ item.name }}
              <span class="info-song--singer"> - {{ handleSongSingers(item.song.artists) }}</span>
            </p>
            <p class="info-desc" v-if="item.song.alias.length">
              {{ item.song.alias.toString() }}
            </p>
          </div>
          <i class="iconfont icon-Play_big_x" v-if="item.song.mvid !== 0"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, Ref, onMounted } from 'vue'
import { banner, personalized, personalizedNewSong } from '../../../api/index'
import SideMenu from '../../../components/SideMenu/index.vue'
import Search from '../../../components/Search/index.vue'

/** 自定义样式 */
const themeVars = {
  swipeIndicatorWidth: '10px'
}

/** 获取banner数据 */
const bannerList: Ref<any[]> = ref([])
const getBanner = async () => {
  const result = await banner({ type: 1 })

  if (result) {
    bannerList.value = (result as any).banners
  }
}

/** 获取推荐歌单 */
const recommendList: Ref<any[]> = ref([])
const getPersonalized = async () => {
  const result = await personalized({ limit: 6 })

  if (result) {
    recommendList.value = (result as any).result
  }
}

/** 获取歌曲推荐 */
const songsLoading: Ref<boolean> = ref(false)
const limitMult: Ref<number> = ref(1)
const personalizedNewSongList: Ref<any[]> = ref([])
const getPersonalizedNewSong = async () => {
  if (songsLoading.value) return
  songsLoading.value = true
  const result = await personalizedNewSong({ limit: 12 * limitMult.value })
  songsLoading.value = false

  if (result) {
    const { result: list } = result as any
    personalizedNewSongList.value = list.slice(-12)
  }
}
/** 处理歌曲歌手 */
const handleSongSingers = (list: any[]) => {
  return list
    .map((item) => item.name)
    .toString()
    .replace(',', '/')
}
/** 更新歌曲列表 */
const handleRefreshSongs = () => {
  if (limitMult.value < 8) {
    limitMult.value += 1
    getPersonalizedNewSong()
  } else {
    limitMult.value = 1
    getPersonalizedNewSong()
  }
}

onMounted(() => {
  getBanner()
  getPersonalized()
  getPersonalizedNewSong()
})
</script>

<style lang="less" scoped>
.findings {
  &-header {
    display: flex;
    align-items: center;
    padding: 8px 10px 14px 16px;

    &--search {
      flex: 1;
      margin: 0 4px 0 14px;
    }

    .icon-tinggeshiqu {
      font-size: 20px;
    }
  }

  &-swiper {
    background: linear-gradient(180deg, transparent, #fff 70%);

    .my-swipe {
      position: relative;

      .my-swipe--image {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 344px;
        height: 134px;
        margin: 0 auto;
        text-align: center;
        border-radius: 10px;
        background-color: #e7e7e7;
        overflow: hidden;

        img {
          width: 100%;
          border-radius: 10px;
        }
      }

      .my-swipe--type {
        position: absolute;
        right: 15.6px;
        bottom: 0px;
        padding: 6px;
        font-size: 10px;
        color: #fff;
        opacity: 0.8;
        border-radius: 10px 0 10px 0;
      }
    }

    &::v-deep(.van-swipe__indicator) {
      width: 10px;
      height: 2px;
      border-radius: 4px;
    }
  }

  &-nav {
    display: flex;
    padding: 14px 0;
    background-color: #fff;
    border-bottom: 0.5px solid #eeeeee;

    &--item {
      flex: 1;
      text-align: center;

      img {
        width: 100%;
        margin-bottom: 4px;
      }

      .item-name {
        font-size: 12px;
      }
    }
  }

  &-recommend {
    padding: 12px 0 14px;
    margin-bottom: 14px;
    background-color: #fff;
    border-radius: 0 0 10px 10px;

    &--header {
      display: flex;
      align-items: center;
      padding: 0 14px;
      margin-bottom: 12px;

      .header-title {
        flex: 1;
        font-size: 16px;
        font-weight: 700;
        color: #333;
      }

      &::v-deep(.van-button--mini) {
        position: relative;
        height: 24px;
        padding: 0 16px 0 10px;
        font-size: 12px;

        .iconfont {
          position: absolute;
          right: 4px;
          top: 4px;
          font-size: 12px;
        }
      }
    }

    &--list {
      display: flex;
      overflow-x: scroll;
      /*解决ios上滑动不流畅*/
      -webkit-overflow-scrolling: touch;

      &::-webkit-scrollbar {
        display: none;
      }

      .list-item {
        flex-shrink: 0;
        width: 104px;
        margin-right: 10px;

        &:first-child {
          margin-left: 14px;
        }

        &:last-child {
          padding-right: 14px;
          margin-right: 14px;
        }

        &--cover {
          position: relative;
          width: 104px;
          height: 104px;
          margin-bottom: 6px;
          background-color: #f1f1f1;
          border-radius: 10px;
          overflow: hidden;

          .cover-img {
            width: 100%;
            height: 100%;
            border: none;
            border-radius: 10px;
          }

          .cover-name {
            position: absolute;
            top: 4px;
            right: 4px;
            padding: 3px 5px;
            font-size: 10px;
            color: #fff;
            background-color: rgba(0, 0, 0, 0.2);
            border-radius: 50px;

            .iconfont {
              position: relative;
              top: 0.4px;
              font-size: 10px;
              font-weight: 700;
            }
          }
        }

        &--name {
          line-height: 14px;
          font-size: 12px;
          .--mixins-ellipsis(2);
        }
      }
    }
  }

  &-songs {
    padding: 14px 0;
    background-color: #fff;
    border-radius: 10px;

    &--header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 14px 0 10px;
      margin-bottom: 8px;

      .header-left {
        display: flex;
        align-items: center;

        &::v-deep(.van-button--mini) {
          width: 28px;
          height: 28px;
          border-color: transparent;

          .icon-refresh {
            position: absolute;
            top: 50%;
            left: 50%;
            font-size: 18px;
            font-weight: 700;
            transform: translate(-51%, -45%);
          }
        }

        &--title {
          font-size: 16px;
          font-weight: 700;
        }
      }

      &::v-deep(.van-button--mini) {
        height: 24px;
        padding: 0 8px 0 6px;
        font-size: 12px;
      }

      .icon-play {
        font-size: 12px;
      }
    }

    &--list {
      display: grid;
      grid-template-columns: 346px 330px 330px 360px;
      grid-column-gap: 14px;
      overflow-x: scroll;
      /*解决ios上滑动不流畅*/
      -webkit-overflow-scrolling: touch;

      &::-webkit-scrollbar {
        display: none;
      }

      .list-item {
        display: flex;
        align-items: center;
        position: relative;
        padding: 5px 0;
        &::after {
          content: '';
          position: absolute;
          left: 65px;
          right: 10px;
          bottom: 0;
          border-top: 0.5px solid rgb(230, 230, 230);
        }

        &:nth-child(4n - 3) {
          margin-left: 16px;
        }

        // &:nth-child(4n) {
        //   margin-right: 28px;
        // }

        &:nth-last-child(-n + 4) {
          &::after {
            content: '';
            border: none;
          }
        }

        &--cover {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          width: 54px;
          height: 54px;
          background-color: #f8f8f8;
          border-radius: 8px;

          img {
            width: 100%;
            border-radius: 8px;
          }

          .iconfont {
            position: absolute;
            top: 50%;
            left: 50%;
            font-size: 18px;
            color: rgba(255, 255, 255, 0.8);
            transform: translate(-50%, -50%);
          }
        }

        &--info {
          flex: 1;
          position: relative;
          margin: 0 10px;

          .info-song {
            font-size: 14px;
            .--mixins-ellipsis(1);

            &--singer {
              font-size: 10px;
              color: rgb(168, 168, 168);
            }
          }

          .info-desc {
            margin-top: 6px;
            font-size: 12px;
            color: rgb(139, 139, 139);
            .--mixins-ellipsis(1);
          }
        }

        .icon-Play_big_x {
          margin: 0 18px 0 14px;
          font-size: 18px;
          color: rgb(129, 129, 129);
        }
      }
    }
  }
}

.refresh-loading {
  animation: rotation 0.8s linear infinite;
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
