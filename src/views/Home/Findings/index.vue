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
          <van-swipe-item v-for="banner in bannerList.list" :key="banner.bannerId">
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
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { banner, personalized, topSong } from '../../../api/index'
import SideMenu from '../../../components/SideMenu/index.vue'
import Search from '../../../components/Search/index.vue'

/** 自定义样式 */
const themeVars = {
  swipeIndicatorWidth: '10px'
}

/** 获取banner数据 */
const bannerList = reactive({ list: [] as any[] })
const getBanner = async () => {
  const result = await banner({ type: 1 })

  if (result) {
    bannerList.list = (result as any).banners
  }
}

/** 获取推荐歌单 */
const recommendList = ref([])
const getPersonalized = async () => {
  const result = await personalized({ limit: 6 })

  if (result) {
    recommendList.value = result.result
  }
}

/** 获取歌曲推荐 */
const topSongList = ref([])
const getTopSong = async () => {
  const result = await topSong({ type: 7 })

  console.log(result)
}

onMounted(() => {
  getBanner()
  getPersonalized()
  getTopSong()
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
            background-color: rgba(0, 0, 0, 0.3);
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
}
</style>
