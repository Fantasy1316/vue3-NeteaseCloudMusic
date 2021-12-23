import axios from 'axios'

const request = axios.create({
  baseURL: 'http://api.fechen.cn/neteasecloudmusic',
  timeout: 60000,
  withCredentials: true
})

request.interceptors.response.use((res) => {
  const { status, data } = res

  switch (status) {
    case 200:
      return data

    default:
      return data
  }
})

export default request
