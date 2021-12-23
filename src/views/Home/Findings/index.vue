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
        <van-swipe class="my-swipe" :autoplay="300000" indicator-color="white" lazy-render>
          <van-swipe-item v-for="banner in bannerList.list" :key="banner.bannerId">
            <div class="my-swipe--image">
              <img :src="banner.pic" :alt="banner.typeTitle" />
            </div>
          </van-swipe-item>
        </van-swipe>
      </van-config-provider>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, onMounted } from 'vue'
import { banner } from '../../../api/index'
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
    bannerList.list = result.banners
  }
}

onMounted(() => {
  getBanner()
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
    .my-swipe--image {
      width: 344px;
      margin: 0 auto;
      border-radius: 10px;
      overflow: hidden;

      img {
        width: 100%;
        border-radius: 10px;
      }
    }

    &::v-deep(.van-swipe__indicator) {
      width: 10px;
      height: 2px;
      border-radius: 4px;
    }
  }
}
</style>
