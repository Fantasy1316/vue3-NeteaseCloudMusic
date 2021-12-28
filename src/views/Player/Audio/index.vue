<template>
  <div class="container">
    <div class="content">123</div>
    <audio :src="musicUrl"></audio>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, Ref } from 'vue'
import { songUrl, songDetail } from '../../../api/index'
import { useRouterMethods } from '../../../utils/global'

const { route } = useRouterMethods()

/** 获取歌曲URL */
const musicUrl: Ref<string> = ref('')
const { id } = route.params
const getSongUrl = async () => {
  const result = await songUrl({ id })

  if (result) {
    musicUrl.value = result.data[0].url
    console.log(musicUrl)
  }
}

onMounted(() => {
  getSongUrl()
})
</script>

<style lang="less" scoped>
.container {
  .--mixins-container(#fff);
  filter: blur(2px);
  background: url('../../../assets/images/audio-player-bgi.jpeg') no-repeat;
  background-size: 100%;
}
</style>
