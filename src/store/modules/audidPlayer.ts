const audioPlayer = {
  state: () => ({
    audioPlayerFullScreen: true,
    audioPlayerPlayList: []
  }),
  mutations: {
    /** 音乐播放器是否全屏 */
    SET_AUDIOPLAYERFULLSCREEN(state: any, item: boolean) {
      state.audioPlayerFullScreen = item
    },
    /** 设置播放列表 */
    SET_AUDIOPLAYERPLAYLIST(state: any, item: any[]) {
      state.audioPlayerPlayList = item
    }
  },
  getters: {}
}

export default audioPlayer
