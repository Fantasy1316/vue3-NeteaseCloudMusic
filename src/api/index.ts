import Request from '../utils/request'

/** 发现 banner */
export const banner = (params?: any) => {
  return Request({ method: 'get', url: '/banner', params })
}

/** 发现 推荐歌单 */
export const personalized = (params?: any) => {
  return Request({ method: 'get', url: '/personalized', params })
}

/** 发现 推荐新歌 */
export const personalizedNewSong = (params?: any) => {
  return Request({ method: 'get', url: '/personalized/newsong', params })
}

/** 歌曲url */
export const songUrl = (params?: any) => {
  return Request({ method: 'get', url: '/song/url', params })
}

/** 歌曲详情 */
export const songDetail = (params?: any) => {
  return Request({ method: 'get', url: '/song/detail', params })
}
