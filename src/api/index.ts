import Request from '../utils/request'

export const banner = (params?: any) => {
  return Request({ method: 'get', url: '/banner', params })
}
