<template>
  <div class="side-menu">
    <i class="iconfont icon-menu" @click="show = true"></i>
    <van-config-provider :theme-vars="themeVars">
      <van-popup v-model:show="show" position="left" :style="{ width: '84%', height: '100%' }">
        <div class="menu">
          <div class="menu-header" :style="menuHeaderBackgroundColor">
            <div class="menu-header--user">
              <i class="iconfont icon-yonghu2"></i>
              <span class="user-login">立即登录</span>
              <i class="iconfont icon-right"></i>
            </div>
            <i class="iconfont icon-scan"></i>
          </div>
          <div class="menu-body" ref="menuBody">
            <div class="body-vip">
              <div class="body-vip--top">
                <div class="top-left">
                  <p class="top-left--title">开通黑胶VIP</p>
                  <p class="top-left--subtitle">享超21项专属权限</p>
                </div>
                <div class="top-right">
                  <van-button plain round size="mini" type="primary" color="#c5a899">
                    会员中心
                  </van-button>
                </div>
              </div>
              <p class="body-vip--bottom">立享超21项专属权限</p>
            </div>
            <div class="body-cell">
              <van-cell-group>
                <van-cell title="我的消息" is-link>
                  <template #icon>
                    <i class="iconfont icon-duanxin"></i>
                  </template>
                </van-cell>
                <van-cell
                  title="云贝中心"
                  value="做任务赚云贝"
                  is-link
                  value-class="custom-cell-value"
                >
                  <template #icon>
                    <i class="iconfont icon-yunbeiguanli"></i>
                  </template>
                </van-cell>
              </van-cell-group>
            </div>
            <div class="body-cell">
              <p class="body-cell--title">音乐服务</p>
              <van-cell-group>
                <van-cell title="云村有票" is-link :border="false">
                  <template #icon>
                    <i class="iconfont icon-tianmaohuopiaotongxing"></i>
                  </template>
                </van-cell>
                <van-cell title="商城" is-link :border="false">
                  <template #icon>
                    <i class="iconfont icon-gouwuche"></i>
                  </template>
                </van-cell>
                <van-cell title="游戏专区" is-link :border="false">
                  <template #icon>
                    <i class="iconfont icon-chenmiyouxiyujing"></i>
                  </template>
                </van-cell>
                <van-cell title="口袋彩铃" is-link :border="false">
                  <template #icon>
                    <i class="iconfont icon-cailing"></i>
                  </template>
                </van-cell>
              </van-cell-group>
            </div>
            <div class="body-cell">
              <p class="body-cell--title">其他</p>
              <van-cell-group>
                <van-cell title="设置" is-link :border="false">
                  <template #icon>
                    <i class="iconfont icon-setting"></i>
                  </template>
                </van-cell>
                <van-cell title="夜间模式" :border="false">
                  <template #icon>
                    <i class="iconfont icon-yueliang"></i>
                  </template>
                  <template #value>
                    <van-switch
                      v-model="nightMode"
                      size="16px"
                      active-color="#ee0a24"
                      inactive-color="#ccc"
                    />
                  </template>
                </van-cell>
                <van-cell title="定时关闭" is-link :border="false">
                  <template #icon>
                    <i class="iconfont icon-timer"></i>
                  </template>
                </van-cell>
                <van-cell title="个性装扮" is-link :border="false">
                  <template #icon>
                    <i class="iconfont icon-yifu-"></i>
                  </template>
                </van-cell>
                <van-cell
                  title="边听边存"
                  is-link
                  :border="false"
                  value="未开启"
                  value-class="custom-cell-value"
                >
                  <template #icon>
                    <i class="iconfont icon-erji"></i>
                  </template>
                </van-cell>
                <van-cell title="在线听歌免流量" is-link :border="false">
                  <template #icon>
                    <i class="iconfont icon-zaixiantinggemianliuliang"></i>
                  </template>
                </van-cell>
                <van-cell title="音乐黑名单" is-link :border="false">
                  <template #icon>
                    <i class="iconfont icon-heimingdan"></i>
                  </template>
                </van-cell>
                <van-cell
                  title="青少年模式"
                  is-link
                  :border="false"
                  value="未开启"
                  value-class="custom-cell-value"
                >
                  <template #icon>
                    <i class="iconfont icon-anquan"></i>
                  </template>
                </van-cell>
                <van-cell title="音乐闹钟" is-link :border="false">
                  <template #icon>
                    <i class="iconfont icon-naozhong"></i>
                  </template>
                </van-cell>
              </van-cell-group>
            </div>
            <div class="body-cell">
              <van-cell-group>
                <van-cell title="我的订单" is-link :border="false">
                  <template #icon>
                    <i class="iconfont icon-dingdan"></i>
                  </template>
                </van-cell>
                <van-cell title="优惠券" is-link :border="false">
                  <template #icon>
                    <i class="iconfont icon-shinshopyouhuiquan"></i>
                  </template>
                </van-cell>
                <van-cell title="我的客服" is-link :border="false">
                  <template #icon>
                    <i class="iconfont icon-kefu"></i>
                  </template>
                </van-cell>
                <van-cell title="分享网易云音乐" is-link :border="false">
                  <template #icon>
                    <i class="iconfont icon-fenxiang"></i>
                  </template>
                </van-cell>
                <van-cell title="关于" is-link :border="false">
                  <template #icon>
                    <i class="iconfont icon-guanyu"></i>
                  </template>
                </van-cell>
              </van-cell-group>
            </div>
            <div class="body-btn">
              <van-button type="default" block size="large">关闭云音乐</van-button>
            </div>
          </div>
        </div>
      </van-popup>
    </van-config-provider>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, Ref, watch } from 'vue'

/** 侧边菜单显示/隐藏 */
const show: Ref<boolean> = ref(false)
const handleChangeShow = () => {
  show.value = false
}

/** 自定义主题 */
const themeVars = {
  popupBackgroundColor: '#f6f6f6',
  overlayBackgroundColor: 'rgba(0, 0, 0, 0.38)',
  buttonPlainBackgroundColor: 'transparent',
  buttonMiniPadding: '0 8px',
  cellFontSize: '16px',
  cellValueColor: '#ccc',
  cellRightIconColor: '#ccc',
  buttonDefaultBorderColor: '#fff',
  buttonBorderRadius: '12px'
}

/** 夜间模式 */
const nightMode: Ref<boolean> = ref(false)

/** 侧边菜单头部背景色 */
const menuBody = ref(null) as Ref<any>
const colorOpenness: Ref<number> = ref(0)
const menuHeaderBackgroundColor = computed(() => ({
  background: `rgba(255, 255, 255, ${colorOpenness.value})`
}))
const menuBodyScorllEvent = () => {
  const scrollTop = menuBody.value.scrollTop
  colorOpenness.value = scrollTop / 100
}

watch(
  () => menuBody.value,
  () => {
    menuBody.value.addEventListener('scroll', menuBodyScorllEvent)
  }
)
</script>

<style lang="less" scoped>
.side-menu {
  .icon-menu {
    font-size: 18px;
    font-weight: 700;
  }

  .menu {
    display: flex;
    flex-direction: column;
    height: 100%;

    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 14px;

      &--user {
        display: flex;
        align-items: center;

        .icon-yonghu2 {
          font-size: 34px;
          color: #fadcdc;
        }

        .user-login {
          font-size: 16px;
          margin-left: 4px;
        }
      }

      .icon-scan {
        font-size: 20px;
      }
    }

    &-body {
      flex: 1;
      padding: 0 14px;
      overflow-y: scroll;

      .body-vip {
        padding: 12px 14px 16px;
        margin-bottom: 14px;
        background: linear-gradient(135deg, #252324, #444243);
        border-radius: 14px;

        &--top {
          display: flex;
          padding-bottom: 14px;
          border-bottom: 0.5px solid #7e7970;

          .top-left {
            flex: 1;
            padding-top: 6px;

            &--title {
              margin-bottom: 8px;
              font-size: 16px;
              font-weight: 700;
              color: #dfc4bc;
            }

            &--subtitle {
              font-size: 12px;
              color: #7e7970;
            }
          }
        }

        &--bottom {
          padding-top: 14px;
          font-size: 12px;
          color: #7e7970;
        }
      }

      .body-cell {
        margin-bottom: 14px;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;

        &--title {
          padding: 14px 0;
          font-size: 12px;
          color: #b1b1b1;
          text-indent: 16px;
        }

        .van-cell {
          &::after {
            right: 0;
            font-weight: lighter;
          }

          &__value {
            font-size: 10px;
          }

          &::v-deep(.custom-cell-value) {
            font-size: 12px;
          }
        }

        .iconfont {
          font-size: 18px;
          margin-right: 10px;
        }
      }

      .body-btn {
        margin-bottom: 30px;
        border-radius: 10px;
        overflow: hidden;

        .van-button--default {
          color: #f00;
        }
      }
    }
  }
}
</style>
