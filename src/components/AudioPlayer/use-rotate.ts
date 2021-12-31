import { computed } from 'vue'
import { useStore } from 'vuex'

export default function useRotate() {
  const store = useStore()
  const currentSongStatus = computed(() => store.state.audioPlayer.currentSongStatus)

  const discCoverStyle = computed(() => {
    return currentSongStatus.value
      ? {
          animation: 'rotate 20s linear infinite'
        }
      : ''
  })

  return {
    discCoverStyle
  }
}
