const audioPlayer = {
  state: () => ({
    audioPlayerFullScreen: false, // 播放器是否全屏
    currentSongList: [], // 当前播放列表
    currentSongInfo: {
      // 当前播放歌曲信息
      name: '',
      singer: '',
      cover: ''
    },
    currentSongIndex: null, // 当前播放歌曲 Index
    currentSongId: null, // 当前播放歌曲 Id
    currentSongStatus: 0 // 当前歌曲播放状态 0：停止，1：正常
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
    /** 设置播放信息 */
    SET_CURRENTSONGINFO(state: any, item: any) {
      state.currentSongInfo = item
    },
    /** 设置播放歌曲Index */
    SET_CURRENTSONGINDEX(state: any, item: any[]) {
      state.currentSongIndex = item
    },
    /** 设置播放歌曲Id */
    SET_CURRENTSONGID(state: any, item: any[]) {
      state.currentSongId = item
    },
    /** 设置播放歌曲状态 */
    SET_CURRENTSONGSTATUS(state: any, item: any[]) {
      state.currentSongStatus = item
    }
  },
  getters: {}
}

export default audioPlayer
