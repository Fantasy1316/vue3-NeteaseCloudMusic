import Request from '../utils/request'

export const banner = (params?: any) => {
  return Request({ method: 'get', url: '/banner', params })
}

export const personalized = (params?: any) => {
  return Request({ method: 'get', url: '/personalized', params })
}

export const personalizedNewSong = (params?: any) => {
  return Request({ method: 'get', url: '/personalized/newsong', params })
}
