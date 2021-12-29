const audioPlayer = {
  state: () => ({
    audioPlayerFullScreen: true,
    currentSongList: [],
    currentSongIndex: null,
    currentSongId: null
  }),
  mutations: {
    /** 音乐播放器是否全屏 */
    SET_AUDIOPLAYERFULLSCREEN(state: any, item: boolean) {
      state.audioPlayerFullScreen = item
    },
    /** 设置播放列表 */
    SET_CURRENTSONGLIST(state: any, item: any[]) {
      state.currentSongList = item
    },
    /** 设置播放歌曲Index */
    SET_CURRENTSONGINDEX(state: any, item: any[]) {
      state.currentSongIndex = item
    },
    /** 设置播放歌曲Id */
    SET_CURRENTSONGID(state: any, item: any[]) {
      state.currentSongId = item
    }
  },
  getters: {}
}

export default audioPlayer
