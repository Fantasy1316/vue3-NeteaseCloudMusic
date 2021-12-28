<template>
  <div class="container" :style="markStyle">
    <div class="mark"></div>
    <audio :src="musicUrl"></audio>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, Ref } from 'vue'
import { songUrl, songDetail } from '../../../api/index'
import { useRouterMethods } from '../../../utils/global'

const { route } = useRouterMethods()
const { id } = route.params

/** 获取歌曲URL */
const musicUrl: Ref<string> = ref('')
const getSongUrl = async () => {
  const result = await songUrl({ id })

  if (result) {
    musicUrl.value = result.data[0].url
    console.log(musicUrl)
  }
}

/** 获取歌曲详情 */
const detail: Ref<any> = ref(null)
const getSongDetail = async () => {
  const result = await songDetail({ ids: id })

  if (result) {
    console.log(result);
    detail.value = (result as any).songs[0]
    console.log(detail.value.al);
    
  }
}
const markStyle = computed(() => {
  return detail.value ? { 
    background: `url(${detail.value.al.picUrl}) no-repeat`,
    backgroundSize: '210% 100%',
    backgroundPosition: 'center top'
  } : ''
})

onMounted(() => {
  getSongUrl()
  getSongDetail()
})
</script>

<style lang="less" scoped>
.container {
  .--mixins-container(#fff);
  
  .mark {
    width: 100%;
    height: 100%;
    color: #fff;
    backdrop-filter: blur(35px);
    // filter: blur(5px);
    background-color: rgba(0, 0, 0, 0.45);
  }
}
</style>
